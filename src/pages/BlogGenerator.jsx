import React, { useState } from 'react';
import { Loader2, Sparkles, Copy, Check } from 'lucide-react';

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
      "rounded-lg border bg-card text-card-foreground shadow-sm",
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
      "text-2xl font-semibold leading-none tracking-tight",
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
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
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
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground",
  };

  return (
    <div className={cn(baseClasses, variants[variant], className)} {...props} />
  );
};

// Toast hook (simplified version)
const useToast = () => {
  const toast = ({ title, description, variant }) => {
    // Simple alert implementation - replace with your preferred toast library
    if (variant === "destructive") {
      alert(`Error: ${title}\n${description}`);
    } else {
      alert(`${title}\n${description}`);
    }
  };

  return { toast };
};

const BlogGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Mock AI workflow - replace with your actual API call
  const generateBlogPost = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "You need to provide a prompt to generate a blog post.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock response - replace with actual API response
    const mockResponse = {
      title: "How to Build Amazing Web Applications",
      content: "Creating modern web applications requires a solid understanding of both frontend and backend technologies. In this comprehensive guide, we'll explore the essential tools and techniques needed to build scalable, user-friendly applications that deliver exceptional user experiences.",
      tags: ["web development", "frontend", "backend", "javascript", "react"],
      summary: "A comprehensive guide to building modern web applications with the latest technologies and best practices.",
      tone: "informative",
      wordCount: 1250
    };
    
    setResponse(mockResponse);
    setIsLoading(false);
    
    toast({
      title: "Blog post generated!",
      description: "Your AI-powered blog post is ready to view.",
    });
  };

  const copyToClipboard = async () => {
    if (!response) return;
    
    const textToCopy = `Title: ${response.title}\n\nContent: ${response.content}\n\nSummary: ${response.summary}\n\nTags: ${response.tags.join(', ')}`;
    
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
    setResponse(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Blog Generator
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Transform your ideas into compelling blog posts with AI
          </p>
        </div>

        {/* Input Section */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              What would you like to write about?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter your blog post prompt here... (e.g., 'Write about the future of artificial intelligence in healthcare')"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] resize-none border-gray-200 focus:border-purple-400 focus:ring-purple-400"
              disabled={isLoading}
            />
            <div className="flex gap-3">
              <Button
                onClick={generateBlogPost}
                disabled={isLoading || !prompt.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
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
                  className="border-gray-300 hover:bg-gray-50 text-gray-700"
                >
                  New Post
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur">
            <CardContent className="py-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative">
                  <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
                  <div className="absolute inset-0 w-12 h-12 border-4 border-purple-200 rounded-full animate-pulse"></div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Crafting your blog post...
                  </h3>
                  <p className="text-gray-600">
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
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2 text-gray-800">
                      {response.title}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {response.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    className="ml-4"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-semibold text-blue-800 mb-2">Summary</h4>
                  <p className="text-blue-700">{response.summary}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Content</h4>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed">{response.content}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">Tone:</span>
                    <Badge variant="outline" className="capitalize">
                      {response.tone}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-600">Word Count:</span>
                    <Badge variant="outline">
                      {response.wordCount.toLocaleString()} words
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* JSON Response Display */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">Raw JSON Response</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{JSON.stringify(response, null, 2)}</code>
                </pre>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogGenerator;
