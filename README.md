# Suncity Projects Vrindavan — Lead Generation & Property Discovery Website

A production-grade real estate discovery and lead generation web platform for residential properties in **Vrindavan, Mathura, Uttar Pradesh**, designed for **Shiva Chaurasia** (+91 8604300712).

---

## 1. Features & Architecture

- **Multi-Project Showcase**: Highlights Suncity Anantam (NH-2), Anantam Villas, Suncity Govind Sharnam (Chhatikara), and Suncity Studio Apartments. Easy to add more projects via `src/data/projectsData.ts`.
- **High-Converting Lead Form**: Includes all 8 required fields, Indian 10-digit mobile number validation (`/^[6-9]\d{9}$/`), un-preselected consent checkbox, and dynamic project preselection.
- **10-Second Timed Enquiry Popup**: Appears after 10 seconds of user activity, shown strictly once per session (`sessionStorage`), dismissed cleanly, and suppressed on the Thank You page.
- **Direct WhatsApp Click-to-Chat**: Context-aware messages prefilling project and property type (without exposing visitor PII in URLs).
- **Optional Ambient Bansuri Flute**: Peaceful Indian classical flute synthesizer using Web Audio API (strictly opt-in, zero autoplay, zero external dependencies).
- **Preserved UTM Attribution**: Captures `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` across the entire session for advertising attribution.
- **Strict Compliance & Integrity**: Never fakes lead submission when no backend is connected; clearly directs enquiries to WhatsApp or connected endpoints.

---

## 2. Running Locally

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Steps
```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Open in your browser
http://localhost:3000
```

---

## 3. Uploading to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Suncity Projects Vrindavan platform"

# Create a new repository on GitHub (e.g. suncity-vrindavan)
# Link remote and push:
git remote add origin https://github.com/YOUR_USERNAME/suncity-vrindavan.git
git branch -M main
git push -u origin main
```

---

## 4. Deploying to Vercel

1. Log in to [Vercel](https://vercel.com).
2. Click **"Add New"** > **"Project"**.
3. Import your GitHub repository (`suncity-vrindavan`).
4. Framework Preset: **Vite** (detected automatically).
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **"Deploy"**. Your site will be live within 60 seconds with SSL enabled.

---

## 5. Connecting Your Custom Domain on Vercel

1. In your Vercel project dashboard, go to **Settings** > **Domains**.
2. Enter your custom domain name (e.g., `suncityvrindavan.in` or `www.suncityvrindavan.in`).
3. Vercel will display the required DNS records:
   - **For apex domain (`suncityvrindavan.in`)**:
     - Type: `A`
     - Name: `@`
     - Value: `76.76.21.21`
   - **For subdomain (`www.suncityvrindavan.in`)**:
     - Type: `CNAME`
     - Name: `www`
     - Value: `cname.vercel-dns.com`
4. Update these records at your domain registrar (GoDaddy, Namecheap, Hostinger, etc.). DNS propagates typically within 5–30 minutes.

---

## 6. Google Sheets Automation (Backend Integration)

To automatically record lead submissions into a private Google Sheet without maintaining a dedicated database:

### Step 1: Create a Google Sheet
Create a new Google Sheet named **"Suncity Vrindavan Leads"** with the following column headers in Row 1:
- `Timestamp`
- `Full Name`
- `Mobile Number`
- `Email`
- `Preferred Project`
- `Property Type`
- `Purpose`
- `Budget Bracket`
- `Contact Method`
- `Consent Granted`
- `UTM Source`
- `UTM Medium`
- `UTM Campaign`
- `Landing Page URL`

### Step 2: Add Google Apps Script
1. In your Google Sheet, click **Extensions** > **Apps Script**.
2. Replace all code with:

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    var row = [
      data.submittedAt || new Date().toISOString(),
      data.fullName || '',
      "'" + (data.mobile || ''),
      data.email || '',
      data.preferredProject || '',
      data.propertyType || '',
      data.purpose || '',
      data.budget || '',
      data.preferredContactMethod || '',
      data.consent ? 'YES' : 'NO',
      (data.utmParams && data.utmParams.source) || '',
      (data.utmParams && data.utmParams.medium) || '',
      (data.utmParams && data.utmParams.campaign) || '',
      (data.utmParams && data.utmParams.landingUrl) || ''
    ];
    
    sheet.appendRow(row);
    
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "message": "Enquiry registered successfully" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

3. Click **Deploy** > **New Deployment**.
4. Select type **Web app**.
   - Description: `Suncity Lead Receiver`
   - Execute as: `Me`
   - Who has access: `Anyone`
5. Click **Deploy** and copy the **Web app URL** (e.g. `https://script.google.com/macros/s/AKfycb.../exec`).

### Step 3: Connect to your App
In your Vercel project dashboard:
- Go to **Settings** > **Environment Variables**.
- Add key: `VITE_LEAD_API_ENDPOINT`
- Value: `<Your Google Apps Script Web App URL>`
- Redeploy the project.

---

## 7. Google Ads Conversion Tracking (Add Later)

When your Google Ads account is created and your conversion action is set up:

1. Add your Google tag (`gtag.js`) into `<head>` of `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-XXXXXXXXX');
</script>
```

2. Open `src/utils/formService.ts` and locate the `fireConversionTracking` function:
```typescript
export function fireConversionTracking(data: EnquiryFormData) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      'send_to': 'AW-XXXXXXXXX/YOUR_CONVERSION_LABEL',
      'value': 1.0,
      'currency': 'INR',
      'transaction_id': data.submittedAt || Date.now().toString()
    });
  }
}
```
*Note: Tracking triggers **only** after a confirmed backend response, never on button clicks.*

---

## 8. Pre-Launch Verification Checklist

Before launching paid advertising traffic, verify:
- [ ] WhatsApp contact number is verified: **+91 8604300712** (Shiva Chaurasia).
- [ ] Test form submission: Ensure enquiries arrive in your Google Sheet or WhatsApp.
- [ ] Project details, layout maps, and official RERA numbers are verified with the developer before sharing with buyers.
- [ ] Check custom domain SSL certificate status on Vercel.
- [ ] Verify responsive display on mobile devices.


## Vrindavan lead integration (updated)
- The exact user-supplied Suncity Projects logo is stored at `public/suncity-logo.png` and used by the React logo component.
- The lead form posts URL-encoded fields (`fullName`, `mobile`, `propertyType`, `purpose`, `budget`, `consent`, `source`) to the Google Apps Script endpoint.
- After the form dispatches the request, it opens WhatsApp in a new tab where the browser allows it and navigates the current page to the in-app Thank You page.
- Google Apps Script `no-cors` requests do not expose a readable server response to the browser. Therefore, the frontend cannot independently verify the row was saved; test a real submission in the Google Sheet after deployment.
- If you replace the Apps Script deployment, update `VITE_LEAD_API_ENDPOINT` in your hosting environment and redeploy.
