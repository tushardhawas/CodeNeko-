import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FolderIcon, PlusIcon, ClockIcon, GitBranchIcon } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  languages: string[];
  lastActive: string;
  totalTime: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'CodeNeko',
    description: 'Developer productivity tracker with cat mascot',
    languages: ['TypeScript', 'React', 'Tailwind'],
    lastActive: '2 hours ago',
    totalTime: '45h 30m',
  },
  {
    id: '2',
    name: 'Personal Website',
    description: 'My portfolio website',
    languages: ['JavaScript', 'HTML', 'CSS'],
    lastActive: '3 days ago',
    totalTime: '12h 15m',
  },
  {
    id: '3',
    name: 'Task Manager API',
    description: 'Backend for a task management application',
    languages: ['Node.js', 'Express', 'MongoDB'],
    lastActive: '1 week ago',
    totalTime: '28h 45m',
  },
];

export default function Projects() {
  const [projects] = useState<Project[]>(mockProjects);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage and track your coding projects</p>
        </div>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <FolderIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{project.name}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="pt-1">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-1">
                    {project.languages.map((lang) => (
                      <span
                        key={lang}
                        className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-3 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <ClockIcon className="mr-1 h-3 w-3" />
                    {project.totalTime}
                  </div>
                  <div className="flex items-center">
                    <GitBranchIcon className="mr-1 h-3 w-3" />
                    Last active {project.lastActive}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <p className="text-center text-muted-foreground">Active projects placeholder</p>
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          <p className="text-center text-muted-foreground">Archived projects placeholder</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
