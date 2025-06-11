import Link from 'next/link';
import { Archive, Upload, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Archive className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Archive</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your comprehensive resource archive for games, apps, tools, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/explore" className="text-muted-foreground hover:text-primary transition-colors">
                  Explore All
                </Link>
              </li>
              <li>
                <Link href="/explore?category=games" className="text-muted-foreground hover:text-primary transition-colors">
                  Games
                </Link>
              </li>
              <li>
                <Link href="/explore?category=apps" className="text-muted-foreground hover:text-primary transition-colors">
                  Apps
                </Link>
              </li>
              <li>
                <Link href="/explore?category=tools" className="text-muted-foreground hover:text-primary transition-colors">
                  Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Platforms */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Platforms</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/explore?platform=pc" className="text-muted-foreground hover:text-primary transition-colors">
                  PC
                </Link>
              </li>
              <li>
                <Link href="/explore?platform=android" className="text-muted-foreground hover:text-primary transition-colors">
                  Android
                </Link>
              </li>
              <li>
                <Link href="/explore?platform=ios" className="text-muted-foreground hover:text-primary transition-colors">
                  iOS
                </Link>
              </li>
              <li>
                <Link href="/explore?platform=mobile" className="text-muted-foreground hover:text-primary transition-colors">
                  Mobile
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/upload" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2">
                  <Upload className="h-4 w-4" />
                  <span>Upload Resource</span>
                </Link>
              </li>
              <li>
                <Link href="/request" className="text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Request Resource</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Archive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}