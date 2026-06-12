# 🎨 UI/UX Design Specification

The design of **Secrets** is a blend of mystery and minimalism. We prioritize content and anonymity through a "Card-First" design language.

---

## 🌈 Visual Palette

| Color | Hex Code | Preview | Usage |
| :--- | :--- | :--- | :--- |
| **Ash Gray** | `#EEEEEE` | ![](https://via.placeholder.com/15/EEEEEE/000000?text=+) | Primary Background |
| **Dark Onyx** | `#212529` | ![](https://via.placeholder.com/15/212529/000000?text=+) | Primary Buttons / Text |
| **Ghost White** | `#FFFFFF` | ![](https://via.placeholder.com/15/FFFFFF/000000?text=+) | Card Backgrounds |
| **Crimson** | `#DC3545` | ![](https://via.placeholder.com/15/DC3545/000000?text=+) | Action / Danger Buttons |

---

## 🧱 Component Blueprint

```mermaid
graph TD
    Root[app-root] --> Nav[Navbar]
    Root --> Router[router-outlet]
    Router --> Home[HomeComponent]
    Router --> Feed[SecretsComponent]
    Router --> Submit[SubmitComponent]
    
    Feed --> Card[Secret Card]
    Card --> Content[Text Content]
    Card --> Action[Anonymous Badge]
```

---

## 📱 UI Previews (Simulated)

### **1. The Landing Hero**
> A centered, high-impact jumbotron that sets the tone.

<div style="background-color: #f8f9fa; padding: 40px; border-radius: 15px; text-align: center; border: 1px solid #ddd; margin-bottom: 20px;">
    <h1 style="font-size: 3rem; margin-bottom: 0;">🔑</h1>
    <h2 style="font-weight: 300; margin-top: 10px;">Secrets</h2>
    <p style="color: #666;">Don't keep your secrets, share them anonymously!</p>
    <div style="margin-top: 20px;">
        <button style="background-color: #212529; color: white; padding: 10px 20px; border: none; border-radius: 5px; margin-right: 10px;">Login</button>
        <button style="background-color: #f8f9fa; color: #212529; border: 1px solid #212529; padding: 10px 20px; border-radius: 5px;">Register</button>
    </div>
</div>

### **2. The Secret Card**
> Minimalist, floating cards designed to highlight the text.

<div style="background-color: white; padding: 25px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; max-width: 400px; margin: 0 auto; border-top: 5px solid #212529;">
    <p style="font-style: italic; font-size: 1.2rem; color: #333;">"I actually like pineapple on pizza, but I tell everyone I hate it so I can fit in at parties..."</p>
    <hr style="width: 30%; margin: 15px auto; border: 0.5px solid #eee;">
    <span style="font-size: 0.8rem; color: #999; text-transform: uppercase; letter-spacing: 1px;">Anonymous Contributor</span>
</div>

---

## ⚙️ Interactive Elements
- **Hover Transitions:** Cards lift slightly (`transform: translateY(-5px)`) on hover to indicate interactivity.
- **Glassmorphism:** Navigation bar uses a subtle blur effect on scroll.
- **Loading States:** Skeleton loaders are used while fetching secrets from the MongoDB backend to ensure a perceived performance boost.
