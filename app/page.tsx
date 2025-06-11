import Link from 'next/link';
import { ArrowRight, Download, Users, Star, Gamepad2, Smartphone, Wrench, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SearchBar from '@/components/ui/search-bar';

export default function HomePage() {
  const categories = [
    {
      name: 'Games',
      icon: Gamepad2,
      description: 'PC and mobile games',
      href: '/explore?category=games',
      color: 'bg-blue-500'
    },
    {
      name: 'Apps',
      icon: Smartphone,
      description: 'Mobile and desktop applications',
      href: '/explore?category=apps',
      color: 'bg-green-500'
    },
    {
      name: 'Tools',
      icon: Wrench,
      description: 'Utilities and productivity tools',
      href: '/explore?category=tools',
      color: 'bg-orange-500'
    },
    {
      name: 'Resources',
      icon: BookOpen,
      description: 'Guides, templates, and more',
      href: '/explore?category=resources',
      color: 'bg-purple-500'
    }
  ];

  const stats = [
    { label: 'Total Resources', value: '10,000+', icon: Download },
    { label: 'Active Users', value: '50,000+', icon: Users },
    { label: 'Average Rating', value: '4.8/5', icon: Star }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Your Ultimate Resource Archive
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover, download, and share games, apps, tools, and resources. 
            Everything you need in one comprehensive archive.
          </p>
          
          {/* Large Search Bar */}
          <div className="mb-8">
            <SearchBar size="large" placeholder="Search for games, apps, tools, and more..." />
          </div>

          <Link href="/explore">
            <Button size="lg" className="text-lg px-8 py-6">
              Explore Every Resource
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
            <p className="text-xl text-muted-foreground">
              Find exactly what you're looking for in our organized collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href={category.href}>
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${category.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Filters */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Platform</h2>
            <p className="text-muted-foreground">
              Filter resources by your preferred platform
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {['PC', 'Android', 'iOS', 'Mobile'].map((platform) => (
              <Link key={platform} href={`/explore?platform=${platform.toLowerCase()}`}>
                <Button variant="outline" size="lg" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                  {platform}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Contribute?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Share your resources with the community and help others discover amazing content
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/upload">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Upload Resource
              </Button>
            </Link>
            <Link href="/request">
              <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Request Resource
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}