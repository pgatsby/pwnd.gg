2025-11-12T02:23:31Z - Worked on styling the profile to fit mobile view.
2025-11-12T05:31:08Z - Adjusted profile info flex behavior and responsive typography to keep avatar/text aligned on mobile.
2025-11-28T20:50:29Z - Rewrote navbar component logic and styles for reliable hamburger toggle, auto-close on navigation, and responsive dropdown.
2025-11-30T21:29:55Z - Added client-side auth mock on the landing page so test@test.com/password routes to /profile/Tester with inline validation.
2025-12-01T21:36:34Z - Hooked the landing page into Neon Auth via the Stack SDK (credential + OAuth flows) and added a profile redirector to send authenticated users to their slug.
2025-12-01T22:04:41Z - Added a Stack-connected log out button to the navbar that signs the current user out and shows a disabled state while processing.
