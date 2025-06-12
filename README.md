# 🍽️ Akelny - Restaurant Website Builder Platform

## 📌 Project Overview

**Akelny** is a platform that allows restaurant owners to easily build their own restaurant website under the `akelny.com` domain. It comes with a full-featured dashboard for restaurant management, order tracking, delivery zones, discounts, and analytics. A Super Admin dashboard also exists to oversee all restaurant accounts, earnings, and platform-wide analytics.

---

## 👥 User Roles

### 1. Restaurant Owner
- Signs up and chooses a unique ID (e.g., `akelny.com/@Kushary`)
- Access to a personal dashboard for managing their restaurant website, orders, delivery zones, promotions, and analytics.

### 2. Super Admin
- Manages all restaurants, sales data, platform earnings, and analytics.

---

## 🚀 Features

### ✅ Restaurant Owner Dashboard

- **Signup with custom restaurant URL**
- **Website Builder**:
  - Single customizable theme (Navbar, Pages, Sections)
  - Add/edit pages like Home, Menu, Contact
  - Build homepage with sections and menu items
- **Promo Codes**: Create and delete discount codes
- **Delivery Zones**:
  - Define areas with specific delivery fees
- **Order Management**:
  - Track and update order statuses
- **WhatsApp Integration**:
  - Send automatic WhatsApp messages upon new orders
- **Analytics**:
  - Track visitors, orders, and sales (COD & Online)
- **Payments Overview**:
  - See total COD and online order values
- **Notifications**:
  - System alerts for orders, balances, etc.

---

### 🛠 Super Admin Dashboard

- Manage all restaurant accounts
- Track restaurant earnings (daily, weekly, monthly)
- Calculate platform commission (e.g., 5% of total sales)
- System-wide notifications
- Global analytics: visits, signups, earnings

---

### 🌐 Public Website (akelny.com)

- Company profile: About, Features, Pricing, Contact
- Login / Register portal for restaurant owners

---

## 🧱 Technical & Non-Functional Requirements

- Responsive design (mobile + desktop)
- Secure authentication (JWT or OAuth)
- Support for online payments (Paymob or Fawry)
- Scalable backend infrastructure
- GDPR-compliant

---

## 🔭 Roadmap (Future Features)

- Custom restaurant domains ($12/year)
- Multiple themes
- Automated marketing tools (Email/SMS)
- Customer reviews and ratings

---

## 🔁 User Flow

### Restaurant Owner

1. Sign Up → Choose ID → Access Dashboard  
2. Build website and add pages  
3. Define delivery zones and pricing  
4. Add promotions and coupons  
5. Receive orders and update their status  
6. Track analytics and earnings  

### Super Admin

1. Login to admin dashboard  
2. Monitor restaurants and transactions  
3. Calculate commissions  
4. Track overall platform health  

---

## 🔌 Integrations

### WhatsApp API

- Sends order confirmation to customers via WhatsApp
- First 1000 messages/month free; after that, small fee applies

| Monthly Customers | Free? | Extra Cost |
|-------------------|-------|------------|
| ≤ 1000            | ✅    | —          |
| > 1000            | ❌    | Minimal    |

### Others:

- Google Analytics  
- Payment Gateway (Paymob/Fawry)  
- Optional Email/SMS services

---

## 📊 Analytics & Reports

- **Restaurant Owners**: Visits, Orders, Sales (COD & Online)  
- **Super Admin**: Platform-wide metrics, commissions, comparisons

---

## ⚙️ Tech Stack (Suggested)

| Component     | Tools |
|---------------|-------|
| **Frontend**  | React.js or Next.js |
| **Backend**   | Node.js + Express (or Django / Laravel) |
| **Database**  | PostgreSQL or MongoDB |
| **Hosting**   | Vercel, AWS, Netlify, DigitalOcean |
| **Auth**      | JWT / OAuth |
| **Payments**  | Paymob / Fawry |
| **Messaging** | WhatsApp Business API |

---

## 🖥️ Key Screens

- Signup/Login page for restaurants  
- Restaurant dashboard (Site Builder, Orders, Analytics…)  
- Super Admin dashboard  
- Akelny public site (info + registration)

---

## 🧾 Summary

- Akelny is a restaurant website builder platform under akelny.com  
- Restaurant dashboard to manage websites and orders  
- Super Admin dashboard for oversight and revenue tracking  
- Future: Custom domains, multiple themes, marketing tools

---

> 📎 This README is designed for developers 
