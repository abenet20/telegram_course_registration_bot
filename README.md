# Telegram Course Registration Bot

A simple Telegram bot for registering students for online courses in grades 11 and 12. Built using Node.js and [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api), this bot guides users through a registration process, collects student details, and forwards registration information (including payment screenshot) to an admin for approval.

## Features

- Telegram chat-based UI for registration
- Buttons for registration and help
- Collects:
  - Grade selection (11, 12, or both)
  - Name and age
  - Payment screenshot/photo
- Sends all registration details and image to a designated admin for confirmation
- Provides help and about info on command

## How it Works

1. User starts the bot (`/start`)
2. Chooses to register, see about, or request help
3. Guided through grade selection, name, and age input
4. Asked to pay via Telebirr or CBE, and send a screenshot
5. Receives confirmation after admin reviews and adds user

## Setup

### Prerequisites

- Node.js (v14 or later)
- npm
- A Telegram Bot Token (from [@BotFather](https://t.me/botfather))

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/abenet20/telegram_course_registration_bot.git
    cd telegram_course_registration_bot
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Configure the bot:**
    - Set your bot token and admin chat ID in `server.js`:
      ```js
      const token = "<your-telegram-bot-token>";
      const ADMIN_CHAT_ID = <your-admin-chat-id>;
      ```
    - (Optional) Adjust the path for storing photos as needed.

4. **Run the bot:**
    ```bash
    node server.js
    ```

## Usage

- `/start` — Start conversation and show commands (register, about, help)
- `/register` — Begin registration flow
- `/about` — Learn about the bot and service
- `/help` — Get help message about the registration process

## File Structure

```
.
├── server.js
├── package.json
├── node_modules/
├── photos/
└── ...
```

## Admin Actions

- The admin receives a forward of user registration with details and the attached payment screenshot
- After confirming payment, the admin can manually add the user to the relevant Telegram channel
