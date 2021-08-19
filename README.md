# prilog.

Log your life and share it with everybody, even your grandparents. It combines Twitter, Youtube, Instagram, Tik Tok and a Blog in one accessible platform. Would be nic eto get this in a set up where you own your own data.

## Features

- [ ] Different media types
    - [ ] Image
    - [ ] Video
    - [ ] Markdown
    - [ ] Location
- [ ] Changes via
    - [ ] RSS
    - [ ] E-Mail
    - [ ] API endpoint: /wasUpdatedRecently (24h)
    - [ ] iOS Shortcuts for Messengers
- [ ] Auto backups to
    - [ ] Download
    - [ ] E-Mail
    - [ ] Google Drive
    - [ ] Dropbox
    - [ ] OneDrive
- [ ] Public / Private Logs
    - [ ] ~~Allowlisted phone numbers with OTP~~ (to expensive: https://supabase.io/blog/2021/07/28/supabase-auth-passwordless-sms-login & https://www.twilio.com/de/sms/pricing/de)
    - [ ] Allowlist email adresses for all available providers

## Architecture

- Frontend (Vue 3 + Vite) - could be one combined layout
    - Viewer
        - Logs overview
        - Log
    - Admin
        - Login
        - Add
        - Edit
        - Delete
- "Backend" (Supabase)
    - Storage
      - files
    - Tables
        - Logs
            - id
            - title
            - description*
            - last_updated
        - Entries
            - id
            - type: Image / Video / Text / Location
            - title
            - datetime // several entries on one day will be grouped
            - location* // meta data displayed next the date time
            - file*
            - file_alt* // only needed for images
            - markdown*
            - coordinates* // used to display a map
            - last_updated
            - logs_id
    - Auth
        - everything
    
> *can be null
    
            
    
