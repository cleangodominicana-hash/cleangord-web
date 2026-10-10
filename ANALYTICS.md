# Analytics and consent

Clean GO Punta Cana uses Google Analytics 4 through `gtag.js` with measurement ID `G-8RQ4BXZYDG`.

## Consent behavior

- Analytics is opt-in. The Google script is not requested and no analytics event is queued until the visitor accepts.
- The choice is stored in `localStorage` under `cleango.analytics.consent` and can be changed through the persistent analytics settings button.
- Rejecting before acceptance keeps Google Analytics unloaded. Revoking after acceptance sets Google's disable flag, updates analytics consent to denied, and removes accessible GA cookies for the current host and apex domain.
- Advertising storage, advertising user data, and ad personalization remain denied.

Cookie removal is best effort: JavaScript cannot remove cookies with a different path/domain or `HttpOnly`, and revocation cannot delete data already received by Google.

Draft privacy policies are available at `/privacy/` and `/es/privacidad/`. They are not approved final policies. Before deployment, legal review must confirm the controller and contact details, purposes and legal basis, Google and other recipients, cookies and local storage, retention, international transfers, visitor rights and withdrawal method, and the policy's effective date. The consent wording, Google Signals settings, and GA4 data retention also require review.

## Legal review checklist

- Confirm the effective data controller and the legal identification that must appear publicly.
- Assign responsibility for monitoring `cleangodominicana@gmail.com` and handling privacy requests.
- Confirm the legal bases, applicable rights, request procedure, response periods, and competent authority.
- Verify the relevant providers, Google contracting entity, international transfers, and GA4 retention setting.
- Define retention for enquiries and customer records without publishing an unverified period.
- Approve the final wording, effective date, and version before production.

## Events

`contact_click` is sent only with analytics consent for WhatsApp, phone, and email links. Its parameters are limited to:

- `contact_method`: `whatsapp`, `phone`, or `email`
- `page_language`: `en` or `es`
- `cta_location`: the verified page region containing the link

No link URL, visitor name, phone number, email address, free-text message, or form value is sent.

GA4 enhanced measurement may also emit its standard outbound `click` event for WhatsApp. Reports should use `contact_click` for contact intent and must not add the standard `click` count to it.

## Future Resend integration

Do not emit `generate_lead` on form submit. When Resend is implemented, emit it only after the backend confirms successful receipt, without personal data or free-text fields.
