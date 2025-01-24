type FileTree = {
  id: number
  label: string
  href?: string
  files?: FileTree[]
}

export const folders: FileTree[] = [
  {
    id: 1,
    label: "app",
    files: [
      {
        id: 11,
        label: "Data",
        files: [{ id: 111, label: "AuthenticatedUserData.php", href: "#" }],
      },
      {
        id: 12,
        label: "Http",
        files: [
          {
            id: 121,
            label: "Controllers",
            files: [
              {
                id: 1211,
                label: "Auth",
                files: [
                  { id: 12111, label: "AuthenticatedSessionController.php", href: "#" },
                  { id: 12112, label: "ConfirmablePasswordController.php", href: "#" },
                  { id: 12113, label: "EmailVerificationNotificationController.php", href: "#" },
                  { id: 12114, label: "EmailVerificationPromptController.php", href: "#" },
                  { id: 12115, label: "NewPasswordController.php", href: "#" },
                  { id: 12116, label: "PasswordController.php", href: "#" },
                  { id: 12117, label: "PasswordResetLinkController.php", href: "#" },
                  { id: 12118, label: "RegisteredUserController.php", href: "#" },
                  { id: 12119, label: "VerifyEmailController.php", href: "#" },
                ],
              },
              { id: 1212, label: "Controller.php", href: "#" },
              { id: 1213, label: "ProfileController.php", href: "#" },
            ],
          },
          {
            id: 122,
            label: "Middleware",
            files: [{ id: 1221, label: "HandleInertiaRequests.php", href: "#" }],
          },
          {
            id: 123,
            label: "Requests",
            files: [
              {
                id: 1231,
                label: "Auth",
                files: [{ id: 12311, label: "LoginRequest.php", href: "#" }],
              },
              { id: 1232, label: "ProfileUpdateRequest.php", href: "#" },
            ],
          },
        ],
      },
      {
        id: 13,
        label: "Models",
        files: [{ id: 131, label: "User.php", href: "#" }],
      },
      {
        id: 14,
        label: "Providers",
        files: [{ id: 141, label: "AppServiceProvider.php", href: "#" }],
      },
    ],
  },
  {
    id: 2,
    label: "config",
    files: [
      { id: 21, label: "app.php", href: "#" },
      { id: 22, label: "auth.php", href: "#" },
      { id: 23, label: "cache.php", href: "#" },
      { id: 24, label: "data.php", href: "#" },
      { id: 25, label: "database.php", href: "#" },
      { id: 26, label: "filesystems.php", href: "#" },
      { id: 27, label: "logging.php", href: "#" },
      { id: 28, label: "mail.php", href: "#" },
      { id: 29, label: "queue.php", href: "#" },
      { id: 210, label: "services.php", href: "#" },
      { id: 211, label: "session.php", href: "#" },
    ],
  },
  {
    id: 3,
    label: "routes",
    files: [
      { id: 31, label: "auth.php", href: "#" },
      { id: 32, label: "console.php", href: "#" },
      { id: 33, label: "web.php", href: "#" },
    ],
  },
  {
    id: 4,
    label: "database",
    files: [
      { id: 41, label: "database.sqlite", href: "#" },
      {
        id: 42,
        label: "factories",
        files: [{ id: 421, label: "UserFactory.php", href: "#" }],
      },
      {
        id: 43,
        label: "migrations",
        files: [
          { id: 431, label: "0001_01_01_000000_create_users_table.php", href: "#" },
          { id: 432, label: "0001_01_01_000001_create_cache_table.php", href: "#" },
          { id: 433, label: "0001_01_01_000002_create_jobs_table.php", href: "#" },
        ],
      },
      {
        id: 44,
        label: "seeders",
        files: [{ id: 441, label: "DatabaseSeeder.php", href: "#" }],
      },
    ],
  },
  {
    id: 5,
    label: "public",
    files: [
      { id: 51, label: "favicon.ico", href: "#" },
      { id: 52, label: "index.php", href: "#" },
      { id: 53, label: "robots.txt", href: "#" },
    ],
  },
  {
    id: 6,
    label: "resources",
    files: [
      {
        id: 61,
        label: "css",
        files: [{ id: 611, label: "app.css", href: "#" }],
      },
      {
        id: 62,
        label: "js",
        files: [
          {
            id: 621,
            label: "Components",
            files: [
              { id: 6211, label: "ApplicationLogo.tsx", href: "#" },
              { id: 6212, label: "Checkbox.tsx", href: "#" },
              { id: 6213, label: "DangerButton.tsx", href: "#" },
              { id: 6214, label: "Dropdown.tsx", href: "#" },
              { id: 6215, label: "InputError.tsx", href: "#" },
              { id: 6216, label: "InputLabel.tsx", href: "#" },
              { id: 6217, label: "Modal.tsx", href: "#" },
              { id: 6218, label: "NavLink.tsx", href: "#" },
              { id: 6219, label: "PrimaryButton.tsx", href: "#" },
              { id: 6220, label: "ResponsiveNavLink.tsx", href: "#" },
              { id: 6221, label: "SecondaryButton.tsx", href: "#" },
              { id: 6222, label: "TextInput.tsx", href: "#" },
            ],
          },
          {
            id: 622,
            label: "Layouts",
            files: [
              { id: 6221, label: "AuthenticatedLayout.tsx", href: "#" },
              { id: 6222, label: "GuestLayout.tsx", href: "#" },
            ],
          },
          {
            id: 623,
            label: "Pages",
            files: [
              {
                id: 6231,
                label: "Auth",
                files: [
                  { id: 62311, label: "ConfirmPassword.tsx", href: "#" },
                  { id: 62312, label: "ForgotPassword.tsx", href: "#" },
                  { id: 62313, label: "Login.tsx", href: "#" },
                  { id: 62314, label: "Register.tsx", href: "#" },
                  { id: 62315, label: "ResetPassword.tsx", href: "#" },
                  { id: 62316, label: "VerifyEmail.tsx", href: "#" },
                ],
              },
              { id: 6232, label: "Dashboard.tsx", href: "#" },
              {
                id: 6233,
                label: "Profile",
                files: [
                  { id: 62331, label: "Edit.tsx", href: "#" },
                  {
                    id: 62332,
                    label: "Partials",
                    files: [
                      { id: 623321, label: "DeleteUserForm.tsx", href: "#" },
                      {
                        id: 623322,
                        label: "UpdatePasswordForm.tsx",
                        href: "#",
                      },
                      {
                        id: 623323,
                        label: "UpdateProfileInformationForm.tsx",
                        href: "#",
                      },
                    ],
                  },
                ],
              },
              { id: 6234, label: "Welcome.tsx", href: "#" },
            ],
          },
          { id: 624, label: "app.tsx", href: "#" },
          { id: 625, label: "bootstrap.ts", href: "#" },
          { id: 626, label: "ssr.tsx", href: "#" },
          {
            id: 627,
            label: "types",
            files: [
              { id: 6271, label: "global.d.ts", href: "#" },
              { id: 6272, label: "index.d.ts", href: "#" },
              { id: 6273, label: "vite-env.d.ts", href: "#" },
            ],
          },
        ],
      },
      {
        id: 63,
        label: "views",
        files: [{ id: 631, label: "app.blade.php", href: "#" }],
      },
    ],
  },
]
