import { useState } from 'react';

/**
 * Custom hook for managing form state, validation, and submission
 * @param {Object} initialValues - Initial form field values
 * @param {Function} onSubmit - Callback function to execute on successful form submission
 * @returns {Object} Form state and handlers
 */
const useForm = (initialValues, onSubmit) => {
  // State for form field values
  const [values, setValues] = useState(initialValues);
  
  // State for validation errors
  const [errors, setErrors] = useState({});
  
  // State for form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for submission success
  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * Validates a single form field
   * @param {string} name - Field name
   * @param {string} value - Field value
   * @returns {string} Error message or empty string if valid
   */
  const validateField = (name, value) => {
    let error = '';

    // Required field validation
    if (!value || value.trim() === '') {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
      return error;
    }

    // Email format validation
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = 'Please enter a valid email address';
      }
    }

    return error;
  };

  /**
   * Validates all form fields
   * @returns {Object} Object containing all validation errors
   */
  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(values).forEach((key) => {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    return newErrors;
  };

  /**
   * Handles input change events
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update field value
    setValues({
      ...values,
      [name]: value,
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  /**
   * Handles form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const validationErrors = validateForm();
    
    // If there are errors, set them and don't submit
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Set submitting state
    setIsSubmitting(true);

    // Simulate async submission (in real app, this would be an API call)
    setTimeout(() => {
      // Call the onSubmit callback with form values
      onSubmit(values);
      
      // Set submission success
      setIsSubmitted(true);
      setIsSubmitting(false);

      // Reset form after 3 seconds
      setTimeout(() => {
        resetForm();
      }, 3000);
    }, 1000);
  };

  /**
   * Resets the form to initial state
   */
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
    setIsSubmitted(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useForm;
