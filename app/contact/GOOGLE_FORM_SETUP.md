# Google Form Integration Setup

## How to Get the Correct Entry IDs

The contact form is already set up with entry IDs that I extracted from your Google Form. However, if the form doesn't work, follow these steps to verify/update the entry IDs:

### Method 1: Inspect the Google Form (Recommended)

1. Open your Google Form in a browser:
   https://docs.google.com/forms/d/e/1FAIpQLSfEeZn6Av1vFIMVT2B4yRBemiZWaskyFIAEft18ToZpxbA5bw/viewform

2. Right-click anywhere on the form and select **"Inspect"** or press `F12`

3. In the Developer Tools, press `Ctrl+F` (or `Cmd+F` on Mac) and search for `entry.`

4. You'll find entries like:
   - `entry.2005620554` (Name field)
   - `entry.1045781291` (Email field)
   - `entry.1065046570` (Type of Question field)
   - `entry.1166974658` (If Other field)
   - `entry.839337160` (Questions or Comments field)

5. If these numbers are different, update them in `/app/contact/page.js` in the `ENTRY_IDS` object.

### Method 2: Use Form Prefill URL

1. Open your Google Form
2. Click the three dots (⋮) menu
3. Select "Get pre-filled link"
4. Fill in some test data
5. Click "Get link"
6. The URL will contain the entry IDs, e.g.:
   ```
   https://docs.google.com/forms/d/e/.../viewform?entry.2005620554=TestName&entry.1045781291=test@email.com
   ```

## Current Entry IDs Configuration

Based on your form, these are the current mappings:

```javascript
const ENTRY_IDS = {
  name: "entry.2005620554",        // Name field
  email: "entry.1045781291",       // Email field  
  questionType: "entry.1065046570", // Type of Question dropdown
  otherType: "entry.1166974658",   // "If Other" text field
  message: "entry.839337160",      // Questions or Comments field
};
```

## Testing the Form

1. Go to `/contact` on your website
2. Fill out the form
3. Click Submit
4. Check your Google Form responses to see if the submission came through

## Important Notes

- The form uses `mode: "no-cors"` which means we can't verify if the submission succeeded
- After submitting, users will see a success message (even if there's an error)
- You should test the form thoroughly to make sure responses are coming through
- If responses aren't showing up, double-check the entry IDs using the methods above

## Fallback Option

If you can't get the direct integration working, users can still:
- Click "Email Us" in the footer to copy your email
- Or you can keep the Google Form link as a backup in the footer

