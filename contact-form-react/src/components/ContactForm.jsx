import useForm from '../hooks/useForm';
import './ContactForm.css';

/**
 * ContactForm Component
 * A form component that uses the custom useForm hook for state management and validation
 */
const ContactForm = () => {
  // Initial form values
  const initialValues = {
    name: '',
    email: '',
    message: '',
  };

  /**
   * Handle form submission
   * @param {Object} formData - The form data to submit
   */
  const handleFormSubmit = (formData) => {
    console.log('Form submitted successfully:', formData);
    // In a real application, you would send this data to a server
    // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
  };

  // Use the custom useForm hook
  const {
    values,
    errors,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleSubmit,
  } = useForm(initialValues, handleFormSubmit);

  return (
    <div className="contact-form-container">
      <div className="form-header">
        <h2>Get In Touch</h2>
        <p>Fill out the form below and we'll get back to you as soon as possible.</p>
      </div>

      {isSubmitted && (
        <div className="success-message">
          <svg className="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p>Thank you! Your message has been sent successfully.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form" noValidate>
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            className={`form-input ${errors.name ? 'error' : ''}`}
            placeholder="Enter your full name"
            disabled={isSubmitting}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="your.email@example.com"
            disabled={isSubmitting}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        {/* Message Field */}
        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message <span className="required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={values.message}
            onChange={handleChange}
            className={`form-input form-textarea ${errors.message ? 'error' : ''}`}
            placeholder="Tell us what's on your mind..."
            rows="5"
            disabled={isSubmitting}
          />
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting || isSubmitted}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Sending...
            </>
          ) : isSubmitted ? (
            'Sent!'
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
