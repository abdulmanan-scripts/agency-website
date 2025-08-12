'use client';
import { useRouter } from 'next/navigation';
import { FC, FormEvent, useState } from 'react';
import { motion } from 'framer-motion';

import { BOOK_FORM_DEFAULT_STATE, INPUT_FIELDS, RADIO_FIELDS } from '@/data';

//components
import Button from '@/components/ui/Button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';

interface Props {}

const Index: FC<Props> = () => {
  const [form, setForm] = useState(BOOK_FORM_DEFAULT_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { push } = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          submittedAt: new Date().toISOString(),
          status: 'pending'
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setForm(BOOK_FORM_DEFAULT_STATE);
        setTimeout(() => {
          push('/');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-[70vw] md:max-w-[85vw] px-[4vw]">
      <div className="relative">
        <motion.button
          className="group absolute left-0 top-[25%] z-10 box-content rounded-full bg-stone-800 p-[0.5vw] hover:bg-stone-700 transition-colors duration-300"
          onClick={() => push('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-cursor-hover
          data-cursor-text="Back to Home"
        >
          <svg
            focusable="false"
            className="h-[1.5vw] w-[1.5vw] md:h-[2.25vw] md:w-[2.25vw] fill-stone-400 transition group-hover:fill-stone-300"
            viewBox="0 0 24 24"
          >
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"></path>
          </svg>
        </motion.button>
        
        <motion.h1 
          className="mb-[1.75vw] md:text-[4.6vw] md:mb-[2.25vw] text-center text-[3.5vw] font-bold leading-[100%]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Let's Work Together
        </motion.h1>
        
        <motion.p 
          className="text-center text-[1.2vw] md:text-[2.5vw] text-white/70 mb-[3vw]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Tell us about your project and let's create something amazing together.
        </motion.p>
      </div>

      {submitStatus === 'success' && (
        <motion.div 
          className="mb-[3vw] p-[2vw] bg-green-500/20 border border-green-500/50 rounded-lg text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h3 className="text-[1.5vw] md:text-[3vw] font-semibold text-green-400 mb-[0.5vw]">Thank You!</h3>
          <p className="text-[1vw] md:text-[2vw] text-green-300">Your request has been submitted successfully. We'll get back to you soon!</p>
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div 
          className="mb-[3vw] p-[2vw] bg-red-500/20 border border-red-500/50 rounded-lg text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h3 className="text-[1.5vw] md:text-[3vw] font-semibold text-red-400 mb-[0.5vw]">Error</h3>
          <p className="text-[1vw] md:text-[2vw] text-red-300">Something went wrong. Please try again.</p>
        </motion.div>
      )}

      <motion.form 
        className="flex h-full flex-col items-center" 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex flex-wrap">
          {RADIO_FIELDS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <RadioGroup
                onValueChange={(value) => setForm((prev) => ({ ...prev, [item.formKey]: value }))}
                className={`mb-[1.75vw] inline-block w-[calc(50%-1.75vw)] ${item.classes}`}
                required={true}
              >
                <h4 className="mb-[0.2vw] md:mb-[0.5vw] text-[1.3vw] md:text-[1.6vw] font-medium">{item.title}</h4>
                {item.radioArray.map((radio) => (
                  <div key={radio.value} className="flex items-center space-x-[0.65vw] md:space-x-[1vw] md:space-y-[0.3vw] font-[400]">
                    <RadioGroupItem value={radio.value} id={radio.name} required={true} />
                    <label htmlFor={radio.name} className="text-[1vw] md:text-[1.25vw] leading-[1.75vw] cursor-pointer">
                      {radio.name}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </motion.div>
          ))}

          <motion.div 
            className="w-full space-y-[2vw] text-[1.1vw]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            {INPUT_FIELDS.map((item) => (
              <div key={item.label} className={`w-full ${item.classes}`}>
                <label htmlFor={item.label} className="leading-[1.5] mb-[0.4vw] text-[1.2vw] md:text-[1.5vw] inline-block">
                  {item.label}
                </label>
                <input
                  onChange={({ target: { name, value } }) => setForm((prev) => ({ ...prev, [name]: value }))}
                  type={item.type || 'text'}
                  name={item.name}
                  id={item.label}
                  value={form[name as keyof typeof form] as string}
                  className="h-[3vw] md:h-[4vw] w-full appearance-none rounded-[0.25vw] border-[0.125vw] border-primary/80 bg-transparent px-[1vw] py-[0.8vw] focus:border-primary focus:outline-none transition-colors duration-300"
                  required={item.required}
                  data-cursor-hover
                />
              </div>
            ))}
            <div className="w-full">
              <label className="leading-[1.5] mb-[0.4vw] text-[1.2vw] md:text-[1.5vw] inline-block" htmlFor="message">
                Tell us about your project
              </label>
              <textarea
                minLength={20}
                maxLength={500}
                onChange={({ target: { name, value } }) => setForm((prev) => ({ ...prev, [name]: value }))}
                id="message"
                name="message"
                value={form.message}
                className="min-h-[10vw] w-full resize-none border-[0.125vw] rounded-[0.125vw] text-[1.2vw] md:text-[1.5vw] border-primary/80 bg-transparent px-[0.8vw] py-[0.6vw] focus:border-primary focus:outline-none transition-colors duration-300"
                placeholder="Describe your project goals, requirements, and any specific details you'd like us to know..."
                data-cursor-hover
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <Button
              title={isSubmitting ? "Submitting..." : "Submit Request"}
              type="submit"
              disabled={isSubmitting}
              classes="py-[1.2vw] px-[5vw] md:py-[1.6vw] md:px-[8vw] text-[1.1vw] md:text-[1.5vw] bg-bg-1/90 hover:bg-bg-1/80 disabled:opacity-50"
              btnClasses="p-[0.2vw] md:p-[0.25vw] capitalize self-start mt-[2.5vw]"
            />
          </motion.div>
        </div>
      </motion.form>
    </div>
  );
};

export default Index;