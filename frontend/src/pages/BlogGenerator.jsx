import React, { useState } from 'react';
import { Loader2, Sparkles, Copy, Check } from 'lucide-react';
import { Header } from '../components/Header.jsx';
import { NavigationTabs } from '../components/NavigationTabs.jsx';
import { supabase } from '../client.js';



// Utility function to merge class names
const cn = (...inputs) => {
  const classes = inputs.filter(Boolean).join(' ');
  return classes;
};

// Card Components
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm border-gray-200 dark:border-gray-700",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-gray-900 dark:text-white",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

// Button Component
const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
  
  const variants = {
    default: "bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800",
    destructive: "bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-800",
    outline: "border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700",
    secondary: "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600",
    ghost: "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
    link: "text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

// Textarea Component
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

// Badge Component
const Badge = ({ className, variant = "default", ...props }) => {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  
  const variants = {
    default: "border-transparent bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800",
    secondary: "border-transparent bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600",
    destructive: "border-transparent bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-800",
    outline: "text-gray-900 dark:text-white border-gray-300 dark:border-gray-600",
  };

  return (
    <div className={cn(baseClasses, variants[variant], className)} {...props} />
  );
};

// Select Component
const Select = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});
Select.displayName = "Select";

// Input Component
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

// Toast hook (improved version with bottom-right notifications)
const useToast = () => {
  const toast = ({ title, description, variant = "default" }) => {
    // Create toast element
    const toastContainer = document.getElementById('toast-container') || createToastContainer();
    
    const toastElement = document.createElement('div');
    toastElement.className = `
      mb-4 p-4 rounded-lg shadow-lg border max-w-sm transform transition-all duration-300 ease-in-out
      ${variant === "destructive" 
        ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200" 
        : "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200"
      }
      translate-x-full opacity-0
    `;
    
    toastElement.innerHTML = `
      <div class="flex items-start">
        <div class="flex-1">
          <h4 class="font-semibold text-sm">${title}</h4>
          ${description ? `<p class="text-sm mt-1 opacity-90">${description}</p>` : ''}
        </div>
        <button class="ml-3 text-current opacity-70 hover:opacity-100" onclick="this.parentElement.parentElement.remove()">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    `;
    
    toastContainer.appendChild(toastElement);
    
    // Animate in
    setTimeout(() => {
      toastElement.className = toastElement.className.replace('translate-x-full opacity-0', 'translate-x-0 opacity-100');
    }, 10);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      toastElement.className = toastElement.className.replace('translate-x-0 opacity-100', 'translate-x-full opacity-0');
      setTimeout(() => {
        if (toastElement.parentNode) {
          toastElement.remove();
        }
      }, 300);
    }, 4000);
  };

  return { toast };
};

// Helper function to create toast container
const createToastContainer = () => {
  const container = document.createElement('div');
  container.id = 'toast-container';
  container.className = 'fixed bottom-4 right-4 z-50 flex flex-col-reverse';
  document.body.appendChild(container);
  return container;
};

const BlogGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [tone, setTone] = useState('Professional');
  const [targetAudience, setTargetAudience] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [copied, setCopied] = useState(false);
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const { toast } = useToast();

  // Fetch blogs from Supabase on component mount
  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('past_blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error loading blogs",
          description: "Failed to load previous blogs from database.",
          variant: "destructive"
        });
      } else {
        setSavedBlogs(data || []);
      }
    } catch (error) {
      toast({
        title: "Error loading blogs",
        description: "Failed to load previous blogs from database.",
        variant: "destructive"
      });
    } finally {
      setLoadingBlogs(false);
    }
  };

  // Save blog to Supabase
  const saveBlogToDatabase = async (blogData) => {
    // Ensure blog_id is a number
    const formattedData = {
      ...blogData,
      blog_id: Number(blogData.blog_id), // Convert to number
      // user_id will be automatically set by default
    };

    const { data, error } = await supabase
      .from('past_blogs')
      .insert(formattedData)
      .select();

    if (error) {
      return null;
    }

    return data[0];
  };

  // Load blogs when component mounts
  React.useEffect(() => {
    fetchBlogs();
  }, []);

  const generateBlogPost = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "You need to provide a prompt to generate a blog post.",
        variant: "destructive"
      });
      return;
    }

    if (!targetAudience.trim()) {
      toast({
        title: "Please enter target audience",
        description: "You need to specify the target audience for your blog post.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    let title, blog_content;
    
    try {
      // Create an AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 300000); // 5 minutes timeout

      // Make API call to generate blog post
      const apiResponse = await fetch(import.meta.env.api_key, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: prompt,
          tone: tone.toLowerCase(),
          audience: targetAudience
        }),
        signal: controller.signal,
      });

      // Clear the timeout if request completes
      clearTimeout(timeoutId);

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      title = prompt; // Use the prompt as the title
      blog_content = data.output; // Get content from the output field
      
    } catch (error) {
      // Check if it's a timeout error
      if (error.name === 'AbortError') {
        toast({
          title: "Request timed out",
          description: "The blog generation took too long (5 minutes). Please try again with a simpler prompt.",
          variant: "destructive"
        });
      }
      
      // Fallback to mock response in case of API error
      title = "How to Build Amazing Web Applications";
      blog_content = "Creating modern web applications requires a solid understanding of both frontend and backend technologies. In this comprehensive guide, we'll explore the essential tools and techniques needed to build scalable, user-friendly applications that deliver exceptional user experiences.";
      
      toast({
        title: "Using fallback content",
        description: "API error occurred, using mock data for demonstration.",
        variant: "destructive"
      });
    }

    // Generate a unique blog_id (you can modify this logic as needed)
    const blog_id = Date.now(); // Changed to just a number instead of string

    // Prepare blog data for database
    const blogData = {
      blog_id: blog_id,
      message: prompt,
      tone: tone,
      target_audience: targetAudience,
      title: title,
      blog_content: blog_content
    };

    // Save to Supabase
    const savedBlog = await saveBlogToDatabase(blogData);

    if (savedBlog) {
      // Set response for display
      setResponse({
        ...savedBlog,
        createdAt: new Date(savedBlog.created_at).toISOString().split('T')[0]
      });

      // Refresh the blogs list
      await fetchBlogs();

      toast({
        title: "Blog post generated!",
        description: "Your AI-powered blog post has been saved.",
      });
    } else {
      // Handle database save error
      toast({
        title: "Error saving blog",
        description: "Failed to save blog to database, but you can still view the content.",
        variant: "destructive"
      });
      
      // Still show the response even if save failed
      setResponse({
        blog_id: blog_id,
        message: prompt,
        tone: tone,
        target_audience: targetAudience,
        title: title,
        blog_content: blog_content,
        createdAt: new Date().toISOString().split('T')[0]
      });
    }

    setIsLoading(false);
  };

  const copyToClipboard = async () => {
    if (!response) return;
    
    const textToCopy = `Title: ${response.title}\n\nContent: ${response.blog_content}\n\nTone: ${response.tone}\n\nTarget Audience: ${response.target_audience}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied to clipboard!",
        description: "The blog content has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try copying manually.",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setPrompt('');
    setTone('Professional');
    setTargetAudience('');
    setResponse(null);
  };

  const handleBlogClick = (blog) => {
    setResponse({
      ...blog,
      createdAt: new Date(blog.created_at).toISOString().split('T')[0]
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-[#0d0e14] dark:via-[#151621] dark:to-[#0d0e14] text-gray-900 dark:text-white transition-all duration-500">
      {/* Enhanced background elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-500/3 via-transparent to-blue-500/3 pointer-events-none" />
      <div className="fixed top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-20 animate-fade-in">
        <Header />
      </div>

      {/* Navigation Tabs */}
      <div className="relative z-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <NavigationTabs />
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Previous Blogs Sidebar */}
          <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  Previous Blogs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                {loadingBlogs ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 text-purple-600 dark:text-purple-400 animate-spin" />
                    <span className="ml-2 text-gray-500 dark:text-gray-400">Loading blogs...</span>
                  </div>
                ) : savedBlogs.length > 0 ? (
                  savedBlogs.map((blog) => (
                    <div
                      key={blog.id || blog.blog_id}
                      onClick={() => handleBlogClick(blog)}
                      className="p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                    >
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-1 line-clamp-2">
                        {blog.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                        {blog.message}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                        <span className="capitalize">{blog.tone}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    No blogs generated yet
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Blog Generator */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  AI Blog Generator
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Transform your ideas into compelling blog posts with AI
              </p>
            </div>

            {/* Input Section */}
            <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  What would you like to write about?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter your blog post prompt here... (e.g., 'Write about the future of artificial intelligence in healthcare')"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px] resize-none"
                  disabled={isLoading}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Tone
                    </label>
                    <Select
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      disabled={isLoading}
                    >
                      <option value="Professional">Professional</option>
                      <option value="Witty">Witty</option>
                      <option value="Sarcastic">Sarcastic</option>
                      <option value="Authoritative">Authoritative</option>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Target Audience
                    </label>
                    <Input
                      placeholder="e.g., Software developers, Marketing professionals"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    onClick={generateBlogPost}
                    disabled={isLoading || !prompt.trim() || !targetAudience.trim()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Blog Post
                      </>
                    )}
                  </Button>
                  {response && (
                    <Button
                      onClick={resetForm}
                      variant="outline"
                      className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      New Post
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Loading State */}
            {isLoading && (
              <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur animate-fade-in">
                <CardContent className="py-12">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="relative">
                      <Loader2 className="w-12 h-12 text-purple-600 dark:text-purple-400 animate-spin" />
                      <div className="absolute inset-0 w-12 h-12 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Crafting your blog post...
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Our AI is analyzing your prompt and generating compelling content
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Response Display */}
            {response && !isLoading && (
              <div className="space-y-6 animate-fade-in">
                {/* Blog Post Content */}
                <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2 text-gray-800 dark:text-gray-200">
                          {response.title}
                        </CardTitle>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          onClick={copyToClipboard}
                          variant="outline"
                          size="sm"
                        >
                          {copied ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Content</h4>
                      <div className="prose prose-gray dark:prose-invert max-w-none">
                        <div 
                          className="text-gray-700 dark:text-gray-300 leading-relaxed"
                          dangerouslySetInnerHTML={{ 
                            __html: response.blog_content
                              .replace(/## (.*)/g, '<h2 class="text-xl font-bold mt-6 mb-3 text-gray-800 dark:text-gray-200">$1</h2>')
                              .replace(/### (.*)/g, '<h3 class="text-lg font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">$1</h3>')
                              .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
                              .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
                              .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
                              .replace(/^- (.*)/gm, '<li class="ml-4 list-disc">$1</li>')
                              .replace(/(<li.*<\/li>)/gs, '<ul class="my-3 space-y-1">$1</ul>')
                              .replace(/\n\n/g, '</p><p class="mb-4">')
                              .replace(/^(?!<[h|u|l])(.+)$/gm, '<p class="mb-4">$1</p>')
                              .replace(/<p class="mb-4"><\/p>/g, '')
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tone:</span>
                        <Badge variant="outline" className="capitalize">
                          {response.tone}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Target Audience:</span>
                        <Badge variant="outline">
                          {response.target_audience}
                        </Badge>
                      </div>
                      {response.createdAt && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Created:</span>
                          <Badge variant="outline">
                            {response.createdAt}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* JSON Response Display */}
                <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-800 dark:text-gray-200">Raw JSON Response</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 dark:text-gray-200 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{JSON.stringify(response, null, 2)}</code>
                    </pre>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogGenerator;
