# LocaleVibe

LocaleVibe is a dynamic social platform designed to help users discover and share experiences in local spots, such as cafes, restaurants, and hidden gems within their city. The project offers a modern and interactive interface, encouraging users to connect and engage through likes, comments, and visits.

---

## Project Idea

The core idea behind LocaleVibe is to create a community-driven platform where users can:

- Explore vibrant local spots shared by others.
- Share their own experiences with photos, descriptions, and ratings.
- Interact with other users by liking, commenting, and tracking visited spots.

The uniqueness of LocaleVibe lies in its focus on hyper-local engagement, creating a virtual neighborhood where users discover the best places through trusted recommendations and real experiences.

---

## Features

- **User Profiles**: Users can create accounts, add profile pictures, and maintain their own personal lists of liked and visited spots.
- **Vibespot Listings**: Users can browse, add, and view detailed information about vibespots, including images, descriptions, and reviews.
- **Interactive Engagement**:
  - Like and comment on vibespots.
  - Pagination for comments to handle large datasets efficiently.
  - Tracking visited spots.
- **Real-time Updates**: Updates on likes, comments, and visits are reflected instantly without page reloads.
- **Secure Authentication**: User data and sessions are securely managed.

---

## Tech Stack

**Frontend**:

- React.js
- Redux (for global state management)
- HTML5, CSS3

**Backend**:

- Node.js with Express.js
- MongoDB (as the database)

**Other Tools and Libraries**:

- Axios or Fetch API for HTTP requests
- JSON Web Tokens (JWT) for secure authentication
- Mongoose for MongoDB object modeling

---

## Setup and Usage

Follow these steps to set up LocaleVibe on your local machine:

### Prerequisites

1. Install [Node.js](https://nodejs.org/) (version 16 or higher).
2. Install [MongoDB](https://www.mongodb.com/try/download/community).
3. Have Git installed and set up on your system.

### Clone the Repository

```bash
# Clone the repository
git clone https://github.com/3303mavihS/LocaleVibe.git

# Navigate to the project directory
cd LocaleVibe
```

### Install Dependencies

#### Server

```bash
cd server
npm install
```

#### Client

```bash
cd client
npm install
```

### Start the Project

#### Start the Backend Server

```bash
cd server
node app.js
```

OR

```bash
npm start
```

#### Start the Frontend Client

```bash
cd client
npm start
```

### Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
PORT=3001
MONGO_URI=<Your MongoDB Connection URI>
JWT_SECRET=<Your JWT Secret>
```

Replace `<Your MongoDB Connection URI>` and `<Your JWT Secret>` with your actual values.

---

## How to Use the Repository

1. **Clone and Setup**: Follow the setup instructions above.
2. **Development**:
   - Modify the frontend in the `client` folder.
   - Update the backend APIs in the `server` folder.
3. **Run Locally**:
   - Start both the server and client, then access the app at `http://localhost:3000`.
4. **Deploy**:
   - Deploy the frontend to a platform like Netlify or Vercel.
   - Deploy the backend to a service like Heroku or AWS.

---

## Uniqueness

- **Hyper-local Approach**: LocaleVibe focuses on community-driven discovery of local spots rather than global locations.
- **User Interaction**: Real-time updates ensure seamless engagement.
- **Modern Design**: A clean and intuitive interface designed for ease of use.

---

## Contributing

We welcome contributions to LocaleVibe! To contribute:

1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Commit your changes.
4. Push to your branch and submit a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For any questions or feedback, please reach out:

- **Author**: Shivam Sharma
- **GitHub**: [3303mavihS](https://github.com/3303mavihS)
