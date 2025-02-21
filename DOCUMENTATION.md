# Biodata Generator Documentation

## Project Overview
This application allows users to create professional biodatas with customizable themes, form fields, and PDF generation capabilities.

## Architecture Diagrams

### 1. Component Relationship
```mermaid
graph TD
    A[app/page.tsx] --> B[ThemeSelector]
    A --> C[app/themes/page.tsx]
    C --> B
    C --> D[app/canvas/page.tsx]
    D --> E[BiodataForm]

    subgraph ThemeSelector
        B --> F[Theme Buttons]
        F --> G[Navigation to Canvas]
    end

    subgraph BiodataForm
        E --> H[Form Sections]
        E --> I[Preview Modal]
        E --> J[PDF Generation]
        
        H --> K[Personal Info]
        H --> L[Education]
        H --> M[Family Info]
        H --> N[Contact Info]
        
        I --> O[PreviewContent]
        O --> P[PreviewSection]
        
        J --> Q[html2canvas]
        J --> R[jsPDF]
    end

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    style E fill:#bbf,stroke:#333,stroke-width:2px
```

### 2. Component Structure
```mermaid
classDiagram
    class App {
        +page.tsx
        +themes/page.tsx
        +canvas/page.tsx
    }
    
    class ThemeSelector {
        +themes: Theme[]
        +selectedTheme: string
        +handleThemeSelect()
        +render()
    }
    
    class BiodataForm {
        +formData: BiodataFormData
        +theme: string
        +showShree: boolean
        +generatePDF()
        +handleSubmit()
        +render()
    }
    
    class PreviewContent {
        +theme: string
        +data: BiodataFormData
        +render()
    }
    
    class FormField {
        +label: string
        +name: string
        +type: string
        +value: string
        +onChange: function
        +options?: string[]
        +render()
    }

    App --> ThemeSelector
    App --> BiodataForm
    BiodataForm --> PreviewContent
    BiodataForm --> FormField
```

### 3. User Flow
```mermaid
sequenceDiagram
    participant User
    participant ThemeSelector
    participant Canvas
    participant BiodataForm
    participant PDF

    User->>ThemeSelector: Selects Theme
    ThemeSelector->>Canvas: Navigate with theme param
    Canvas->>BiodataForm: Render with theme
    User->>BiodataForm: Fills Form Data
    User->>BiodataForm: Clicks Preview
    BiodataForm->>BiodataForm: Shows Modal
    User->>BiodataForm: Clicks Generate PDF
    BiodataForm->>PDF: Convert to PDF
    PDF->>User: Download PDF
```

## Key Features

### 1. Theme System
- Multiple predefined themes
- Custom background patterns
- Border variations
- Color schemes
- A4 page formatting

### 2. Form Components
- Personal Information
  - Name, Birth details
  - Religion, Caste
  - Horoscope details
- Education & Career
  - Education details
  - Occupation
  - Income
- Family Information
  - Parents details
  - Siblings
  - Family background
- Contact Details
  - Address
  - Phone numbers

### 3. Customization Options
- Show/Hide fields
- Optional sections
- Custom header text
- Multilingual support (Marathi/English)

### 4. Preview & Generation
- Live preview modal
- PDF generation
- A4 size formatting
- Print-optimized layout

## Technical Stack
- Next.js 13+ with App Router
- TypeScript
- Tailwind CSS
- html2canvas for PDF generation
- jsPDF for document creation

## File Structure
```
project/
├── app/
│   ├── page.tsx
│   ├── themes/
│   │   └── page.tsx
│   └── canvas/
│       └── page.tsx
├── components/
│   ├── ThemeSelector.tsx
│   ├── BiodataForm.tsx
│   ├── PreviewContent.tsx
│   └── FormField.tsx
└── public/
    └── themes/
        └── [theme-images]
```

## Usage Flow
1. User selects a theme from the theme gallery
2. System navigates to form with selected theme
3. User fills in biodata information
4. Preview available at any time
5. Generate PDF with final layout
6. Download or print the document