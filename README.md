# Invoice Web App Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Installation and Setup](#installation-and-setup)
4. [Application Flow](#application-flow)
5. [Key Components](#key-components)
6. [Technical Implementation](#technical-implementation)
7. [Future Enhancements](#future-enhancements)

## Introduction
This document provides an overview and usage instructions for the Invoice Web App, a React-based application designed to generate invoices for orders placed on an e-commerce platform.

## Project Structure
```
/public
/src
  /assets
  /components
  /store
  App.css
  App.jsx
  index.css
  main.jsx
index.html
package-lock.json
package.json
postcss.config.js
tailwind.config.js
vite.config.js
```

## Installation and Setup
1. Clone the repository: `git clone https://github.com/aknokhwal/Invoice.git`
2. Navigate to the project directory: `cd Invoice`
3. Install dependencies: `npm i` 
4. Start the development server: `npm run dev`

## Application Flow
1. **Home Page** (`/`): Displays Amazon logo and "Create Invoice" button.
2. **Seller Details** (`/seller-details`): Collects seller's information and place of supply.
3. **Billing and Shipping** (`/billing-and-shipping`): Gathers billing and shipping details, with an option to use the same information for both.
4. **Invoice Details** (`/invoice-details`): Captures order details, invoice information, item list, and signature. Includes a preview functionality.

## Key Components
- `Home`: Landing page with logo and navigation button.
- `SellerDetails`: Handles seller information input.
- `BillingAndShipping`: Manages billing and shipping information.
- `OrderInvoiceItemForm`: Combines OrderItem, InvoiceItem, Signature, and OrderForm components for comprehensive data collection.
- `Invoice`: Generates and displays the invoice preview.

## Technical Implementation
### State Management
- Utilizes Recoil for state management across components.
- Atoms represent individual pieces of state, accessible throughout the application.

### Styling
- Implements Tailwind CSS for consistent and responsive design.

### Form Handling and Validation
- Employs Formik for form state management and event handling.
- Integrates Yup for schema-based form validation.
- Implements specific validation rules for critical fields:
  - Pincode: Must be exactly 6 digits.
  - PAN Card: Follows the format of 5 alphabets, followed by 4 numbers, and ending with 1 alphabet (e.g., ABCDE1234F).
  - GST Number: Validates according to the standard GST number format, which is 15 characters long and follows this structure:
    - First 2 digits: State code
    - Next 10 characters: PAN number
    - 13th digit: Entity number
    - 14th digit: Z (by default)
    - 15th digit: Check sum digit
      
### Key Features
- Multi-step form process for structured data entry.
- Dynamic tax calculations based on supply and delivery locations.
- Amount to words conversion using the `to-words` npm module.

### Calculations
- Net Amount: Computed in the OrderForm component.
- Tax: Calculated based on Place of Supply and Place of Delivery.

### Error Handling
- Form validation with real-time error messages using Formik and Yup.

## Future Enhancements
- PDF generation capability.
- Backend API integration for data persistence.
- Additional invoice templates.
- Export functionality to various file formats.
