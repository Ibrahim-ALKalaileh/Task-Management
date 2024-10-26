# Task Management Application

## Table of Contents

- [Task Management Application](#task-management-application)
  - [Table of Contents](#table-of-contents)
  - [Ui Changes](#ui-changes)
  - [Features](#features)
  - [Technical Decisions \& Approach](#technical-decisions--approach)
    - [1. State Management](#1-state-management)
    - [2. Performance Optimization](#2-performance-optimization)
    - [3. Clean, Maintainable Code](#3-clean-maintainable-code)
    - [4. Styling and Responsiveness](#4-styling-and-responsiveness)
    - [5. Task Encryption](#5-task-encryption)
    - [List of proposed Features to improve the app](#list-of-proposed-features-to-improve-the-app)
  - [Setup Instructions](#setup-instructions)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Conclusion](#conclusion)


This project is a Task Management Application built using **React**, **Vite**, **Redux**, and **CSS**. The goal of this application is to provide a scalable, performant, and responsive platform where users can create, edit, delete, and filter tasks. The app is designed following architectural principles, with a focus on clean code, reusability, and good optimization.

## Ui Changes 
 changed Categories in the UI and made them Pills (Following the Number of Clicks to Completion UX Principle), which reduces the amount of clicks the user does.

## Features

- **Task Management**: Users can add new tasks with a title, description, and categories. Tasks can be edited, deleted, and marked as complete or incomplete.
- **Filtering**: Users can filter tasks by completion status and category.
- **Dark Mode**: A dark mode toggle is implemented, allowing the user to switch between light and dark themes.
- **Virtualized Lists**: To handle large lists of tasks efficiently, I implemented a virtualized list that only renders tasks visible on the screen, improving performance.
- **Optimized Image Loading**: Image loading optimization is handled using Web Workers for higher-resolution images, ensuring fast performance without blocking the UI.
- **Global State Management**: Redux is used for global state management, and the application synchronizes tasks across browser tabs using the Broadcast Channel API.
- **Responsive Design**: The solution is built to adapt seamlessly to various screen sizes. Although it's not fully implemented, I used REM and calculated the difference from the root point. Once fully implemented, it will scale up to any resolution perfectly. For smaller devices, a separate design would be preferred.
- **Data Persistence**: LocalStorage is used for persistent storage to ensure task data is saved across page reloads.

## Technical Decisions & Approach

### 1. State Management

- **Redux** was chosen for its scalability and ability to handle complex state logic.

### 2. Performance Optimization

- **React.memo** and **useCallback** are used to memoize components and functions to prevent unnecessary re-renders.
- **React Virtualization**: Built a custom **virtualized list** to render only the items visible on the screen, improving performance for large task lists.
- **Web Workers**: Image loading is offloaded to Web Workers, ensuring that loading high-resolution images does not block the main UI thread.

### 3. Clean, Maintainable Code

- Followed the **Single Responsibility Principle (SRP)** to ensure that components are modular and easy to maintain.
- The project adheres to **DRY** (Don’t Repeat Yourself) principles by creating reusable components for task management, filters, image optimization, and modals.
- **CSS Structure**: BEM methodology is used to ensure that styles are scoped to their respective components, preventing leakage and improving scalability.

### 4. Styling and Responsiveness

- **CSS Modules** and **BEM naming conventions** were applied to ensure that styles are scoped and reusable.
- **Media queries** could be used more to make the app responsive across different screen sizes (mobile and tablet), but I just implemented it briefly for the sake of demonstration.
- **REM units** were chosen to scale the app dynamically based on the root font size, providing better control over layout responsiveness.

### 5. Task Encryption

- A custom **Shift Cipher** encryption was implemented to encrypt sensitive task data like descriptions, as per the assignment requirements.

### List of proposed Features to improve the app

- displaying the time it took to finish the task
- implementing login page and user management system
- implementing a level and exp system ( sort of a reward system ) gamifying the app a bit hehe
- sharing the task to ther users 

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **npm**

### Installation

Please clone the Repo using:

git clone [repolink] .

which will clone the project in the current folder in the terminal

after that run the followong :

npm i npm run dev

### Conclusion

I hope i have more time to implement some features i think it may improve the app like the ones listed above as i barely have spare time with my current job.




Since mobile designs and window behaviors haven't been provided, I didn't invest much in CSS, just demonstrated a few key areas in that regard like dark mode and smooth transitions on DOM style changes like background color changes and BEM approach.

