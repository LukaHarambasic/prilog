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
    - [ ] Allowlisted phone numbers with OTP

## Architecture

- Frontend (Vue 3 + Vite)
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
            - description
            - last_updated
        - Entries
            - id
            - type: Image / Video / Text / Location
            - title
            - datetime
            - file
            - file_alt  
            - markdown
            - coordinates  
            - last_updated
            - logs_id
    - Auth
        - everything
    
            
    