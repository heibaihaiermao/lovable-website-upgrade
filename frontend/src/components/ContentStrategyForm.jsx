import React, { useState } from 'react';
import { Upload, Plus, X, Check, ChevronDown, ChevronUp } from 'lucide-react';

export const ContentStrategyForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData || {
    // Section 1: Brand Identity
    brandName: '',
    brandAdjectives: '',
    preferredTone: [],
    competitors: '',
    voiceReference: '',
    uploadedFiles: [],
    wordsLoveHate: '',
    
    // Section 2: Audience & Goals
    idealCustomer: '',
    desiredActions: [],
    contentGoals: [],
    
    // Section 3: Content Preferences
    contentTypes: [],
    contentFrequency: '',
    approvalRequired: '',
    aiResponses: false,
    
    // Section 4: Topics & SEO Strategy
    mainProducts: '',
    keywords: '',
    frequentQuestions: '',
    hotTakes: '',
    contentFormats: [],
    
    // Section 5: Platform & Automation Preferences
    platforms: [],
    automationTools: '',
    brandAssets: [],
    
    // Section 6: Optional — Promotions & Calendar
    upcomingLaunches: '',
    keyDates: '',
    contentCalendar: '',
    
    // Section 7: Final Notes
    additionalNotes: '',

    // Text field for 'Other' checkbox
    otherInputs: {
    preferredTone: '',
    
  }
  });

  const [expandedSections, setExpandedSections] = useState({
    section1: true,
    section2: false,
    section3: false,
    section4: false,
    section5: false,
    section6: false,
    section7: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const toneOptions = [
    'Conversational', 'Professional', 'Witty', 'Inspirational', 
    'Authoritative', 'Sarcastic', 'Other'
  ];

  const actionOptions = [
    'Buy a product/service', 'Book a call', 'Join my email list', 
    'Follow me on social', 'Reply or comment', 'Share my content', 'Other'
  ];

  const goalOptions = [
    'Increase brand awareness', 'Drive traffic (SEO)', 'Grow my email list',
    'Generate leads', 'Close more sales', 'Build community', 
    'Educate my audience', 'Get more engagement', 'Other'
  ];

  const contentTypeOptions = [
    'Blog posts', 'Email newsletters', 'LinkedIn posts', 'Instagram captions',
    'Twitter/X threads', 'Facebook posts', 'YouTube video descriptions', 'Other'
  ];

  const contentFormatOptions = [
    'How-to guides', 'Case studies', 'Behind-the-scenes', 'Thought leadership',
    'Personal stories', 'Data/insight posts', 'Controversial/opinion posts',
    'Memes or short content', 'Other'
  ];

  const platformOptions = [
    'Substack', 'Mailchimp', 'ConvertKit', 'WordPress', 'Webflow',
    'Instagram', 'LinkedIn', 'X (Twitter)', 'Facebook', 'Notion',
    'Google Docs', 'Zapier/Make', 'TikTok', 'Youtube', 'Other'
  ];

  const SectionHeader = ({ title, subtitle, sectionKey, isExpanded }) => (
    <div 
      className="mb-6 cursor-pointer border-b border-gray-200 dark:border-gray-700 pb-4"
      onClick={() => toggleSection(sectionKey)}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
          {subtitle && <p className="text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>}
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
    </div>
  );

  const CheckboxGroup = ({ options, selectedValues, onChange, field, otherValue, onOtherChange
}) => (
  <div className="space-y-3">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {options.map(option => (
        <label key={option} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedValues.includes(option)}
            onChange={() => onChange(field, option)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          
          {option === "Other" ? (
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 dark:text-gray-300">Other:</span>
              {selectedValues.includes("Other") && (
                <input
                  type="text"
                  value={otherValue}
                  onChange={(e) => onOtherChange(field, e.target.value)}
                  className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white w-40 focus:ring-2 focus:ring-blue-500"
                  placeholder="Specify"
                />
              )}
            </div>
          ) : (
            <span className="text-gray-700 dark:text-gray-300">{option}</span>
          )}
        </label>
      ))}
    </div>
  </div>
);


  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Section 1: Brand Identity */}
      <div>
        <SectionHeader 
          title="Section 1: Brand Identity"
          subtitle="Tell us about your brand personality and voice"
          sectionKey="section1"
          isExpanded={expandedSections.section1}
        />
        
        {expandedSections.section1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What is your brand or personal name? *
              </label>
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) => handleInputChange('brandName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Your brand name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Describe your brand in 3–5 adjectives *
              </label>
              <input
                type="text"
                value={formData.brandAdjectives}
                onChange={(e) => handleInputChange('brandAdjectives', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="e.g., bold, fun, rebellious, professional"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What tone do you prefer in your content? (Select all that apply)
              </label>
              <CheckboxGroup
                options={toneOptions}
                selectedValues={formData.preferredTone}
                onChange={handleCheckboxChange}
                field="preferredTone"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Who are your competitors or brands you admire?
              </label>
              <input
                type="text"
                value={formData.competitors}
                onChange={(e) => handleInputChange('competitors', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="List competitors or brands you admire"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Voice & Style Reference (Optional but Highly Recommended)
              </label>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Share content that reflects your natural tone and writing style. Include blog posts, newsletters, social media content, or inspiration from others.
              </p>
              <textarea
                value={formData.voiceReference}
                onChange={(e) => handleInputChange('voiceReference', e.target.value)}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Paste links to your content or inspiration here..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Are there any words/phrases you love or hate seeing in your content?
              </label>
              <textarea
                value={formData.wordsLoveHate}
                onChange={(e) => handleInputChange('wordsLoveHate', e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Words/phrases you love or want to avoid"
              />
            </div>
          </div>
        )}
      </div>

      {/* Section 2: Audience & Goals */}
      <div>
        <SectionHeader 
          title="Section 2: Audience & Goals"
          subtitle="Define your target audience and content objectives"
          sectionKey="section2"
          isExpanded={expandedSections.section2}
        />
        
        {expandedSections.section2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Who is your ideal customer or reader? (Describe in detail)
              </label>
              <textarea
                value={formData.idealCustomer}
                onChange={(e) => handleInputChange('idealCustomer', e.target.value)}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Describe your ideal customer in detail..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What action do you want your audience to take from your content?
              </label>
              <CheckboxGroup
                options={actionOptions}
                selectedValues={formData.desiredActions}
                onChange={handleCheckboxChange}
                field="desiredActions"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What are your content goals?
              </label>
              <CheckboxGroup
                options={goalOptions}
                selectedValues={formData.contentGoals}
                onChange={handleCheckboxChange}
                field="contentGoals"
              />
            </div>
          </div>
        )}
      </div>

      {/* Section 3: Content Preferences */}
      <div>
        <SectionHeader 
          title="Section 3: Content Preferences"
          subtitle="Specify your content types and posting preferences"
          sectionKey="section3"
          isExpanded={expandedSections.section3}
        />
        
        {expandedSections.section3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What types of content do you want created?
              </label>
              <CheckboxGroup
                options={contentTypeOptions}
                selectedValues={formData.contentTypes}
                onChange={handleCheckboxChange}
                field="contentTypes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                How often do you want content posted for each type?
              </label>
              <textarea
                value={formData.contentFrequency}
                onChange={(e) => handleInputChange('contentFrequency', e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="e.g., Blog posts: 2x/week, LinkedIn: daily, Newsletter: weekly"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Do you want to approve content before it goes live?
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="yes"
                    checked={formData.approvalRequired === 'yes'}
                    onChange={(e) => handleInputChange('approvalRequired', e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Yes, I want to review it</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="no"
                    checked={formData.approvalRequired === 'no'}
                    onChange={(e) => handleInputChange('approvalRequired', e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">No, post it automatically</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Would you like the AI to help respond to comments, DMs, or replies?
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.aiResponses}
                    onChange={(e) => handleInputChange('aiResponses', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Yes, enable AI responses</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section 4: Topics & SEO Strategy */}
      <div>
        <SectionHeader 
          title="Section 4: Topics & SEO Strategy"
          subtitle="Define your content topics and SEO focus areas"
          sectionKey="section4"
          isExpanded={expandedSections.section4}
        />
        
        {expandedSections.section4 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What are your main products, services, or offers?
              </label>
              <textarea
                value={formData.mainProducts}
                onChange={(e) => handleInputChange('mainProducts', e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Describe your main products or services"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What keywords or topics would you like to rank for?
              </label>
              <textarea
                value={formData.keywords}
                onChange={(e) => handleInputChange('keywords', e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="List keywords and topics you want to rank for"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What questions does your audience frequently ask you?
              </label>
              <textarea
                value={formData.frequentQuestions}
                onChange={(e) => handleInputChange('frequentQuestions', e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="List common questions from your audience"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Do you have strong opinions, myths to debunk, or "hot takes" in your industry?
              </label>
              <textarea
                value={formData.hotTakes}
                onChange={(e) => handleInputChange('hotTakes', e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Share your strong opinions or industry hot takes"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What content formats do you like most?
              </label>
              <CheckboxGroup
                options={contentFormatOptions}
                selectedValues={formData.contentFormats}
                onChange={handleCheckboxChange}
                field="contentFormats"
              />
            </div>
          </div>
        )}
      </div>

      {/* Section 5: Platform & Automation Preferences */}
      <div>
        <SectionHeader 
          title="Section 5: Platform & Automation Preferences"
          subtitle="Choose your platforms and automation preferences"
          sectionKey="section5"
          isExpanded={expandedSections.section5}
        />
        
        {expandedSections.section5 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Which platforms do you use or want content for?
              </label>
              <CheckboxGroup
                options={platformOptions}
                selectedValues={formData.platforms}
                onChange={handleCheckboxChange}
                field="platforms"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Do you use any automation or scheduling tools?
              </label>
              <input
                type="text"
                value={formData.automationTools}
                onChange={(e) => handleInputChange('automationTools', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="e.g., Buffer, Later, Zapier, Make"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload your brand assets (logos, images, templates, etc.)
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Click to upload or drag and drop your brand assets
                </p>
                <p className="text-xs text-gray-400">PNG, JPG, PDF up to 10MB</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section 6: Optional — Promotions & Calendar */}
      <div>
        <SectionHeader 
          title="Section 6: Promotions & Calendar (Optional)"
          subtitle="Share upcoming campaigns and important dates"
          sectionKey="section6"
          isExpanded={expandedSections.section6}
        />
        
        {expandedSections.section6 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Do you have any upcoming launches, promos, or campaigns?
              </label>
              <textarea
                value={formData.upcomingLaunches}
                onChange={(e) => handleInputChange('upcomingLaunches', e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Describe upcoming launches or campaigns"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Are there any key dates or seasonal events you want us to build around?
              </label>
              <textarea
                value={formData.keyDates}
                onChange={(e) => handleInputChange('keyDates', e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="List important dates and seasonal events"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Link to your content calendar (if you have one)
              </label>
              <input
                type="url"
                value={formData.contentCalendar}
                onChange={(e) => handleInputChange('contentCalendar', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="https://your-content-calendar-link.com"
              />
            </div>
          </div>
        )}
      </div>

      {/* Section 7: Final Notes */}
      <div>
        <SectionHeader 
          title="Section 7: Final Notes"
          subtitle="Any additional information to help us write content that sounds exactly like you"
          sectionKey="section7"
          isExpanded={expandedSections.section7}
        />
        
        {expandedSections.section7 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Anything else we should know to write content that sounds exactly like you?
              </label>
              <textarea
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Share any additional details that would help us create content that sounds like you"
              />
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-8">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center space-x-2"
        >
          <Check size={20} />
          <span>Save Content Strategy</span>
        </button>
      </div>
    </form>
  );
};

export default ContentStrategyForm;