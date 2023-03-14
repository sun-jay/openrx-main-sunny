Live at [openrx.vercel.app](openrx.vercel.app)
With just a quick photo of the bottle label, OpenRx utilizes Azure OCR and GPT API to accurately parse and manage the medication information, and Twilio to send timely reminders.

The program is built on the Next.js framework, using React.js for the frontend UI and TailwindCSS for styling. Firebase was utilized to authenticate users, secure user data, and host images. The computational power of OpenRx comes from Microsoft Azure Cloud Vision Services OCR, which was used to read prescriptions, accounting for oblique angles and the curvature of the bottle, and OpenAI, which was used for prescription recognition and data retrieval on medications. Twilio was used for real-time reminders for users, ensuring they never miss a dose.
