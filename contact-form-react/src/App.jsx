import ContactForm from './components/ContactForm';
import './App.css';

/**
 * Main App Component
 * Renders the Contact Form application
 */
function App() {
  return (
    <div className="app">
      <div className="app-header">
        <h1 className="app-title">Contact Form</h1>
        <p className="app-subtitle">
          A React application demonstrating the custom useForm hook
        </p>
      </div>
      
      <ContactForm />
      
      <footer className="app-footer">
        <p>Built with React & Custom Hooks</p>
      </footer>
    </div>
  );
}

export default App;

