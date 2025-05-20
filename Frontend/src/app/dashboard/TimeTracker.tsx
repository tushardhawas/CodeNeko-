import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { PlayIcon, PauseIcon, StopCircle } from 'lucide-react';

interface Project {
  id: string;
  name: string;
}

interface Language {
  id: string;
  name: string;
}

export default function TimeTracker() {
  const [isTracking, setIsTracking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [description, setDescription] = useState('');
  const [autoDetect, setAutoDetect] = useState(true);

  const projects: Project[] = [
    { id: '1', name: 'CodeNeko' },
    { id: '2', name: 'Personal Website' },
    { id: '3', name: 'Task Manager API' },
  ];

  const languages: Language[] = [
    { id: '1', name: 'TypeScript' },
    { id: '2', name: 'JavaScript' },
    { id: '3', name: 'Python' },
    { id: '4', name: 'HTML/CSS' },
    { id: '5', name: 'Java' },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTracking && !isPaused) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTracking, isPaused]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsTracking(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsTracking(false);
    setIsPaused(false);
    // Here you would typically save the session
    setElapsedTime(0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Time Tracker</h1>
        <p className="text-muted-foreground">Track your coding time across different projects</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Current Session</CardTitle>
            <CardDescription>Track your current coding session</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="text-4xl font-bold tabular-nums">
                {formatTime(elapsedTime)}
              </div>
              <div className="text-sm text-muted-foreground">
                {isTracking ? (isPaused ? 'Paused' : 'Tracking...') : 'Not tracking'}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project">Project</Label>
                <Select
                  value={selectedProject}
                  onValueChange={setSelectedProject}
                  disabled={isTracking}
                >
                  <SelectTrigger id="project">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map(project => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="language">Language</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="auto-detect"
                      checked={autoDetect}
                      onCheckedChange={setAutoDetect}
                      disabled={isTracking}
                    />
                    <Label htmlFor="auto-detect" className="text-sm">Auto-detect</Label>
                  </div>
                </div>
                <Select
                  value={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                  disabled={isTracking || autoDetect}
                >
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(language => (
                      <SelectItem key={language.id} value={language.id}>
                        {language.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input
                  id="description"
                  placeholder="What are you working on?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isTracking}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {!isTracking ? (
              <Button onClick={handleStart} disabled={!selectedProject}>
                <PlayIcon className="mr-2 h-4 w-4" />
                Start Tracking
              </Button>
            ) : (
              <div className="flex w-full gap-2">
                {isPaused ? (
                  <Button onClick={handleResume} variant="outline" className="flex-1">
                    <PlayIcon className="mr-2 h-4 w-4" />
                    Resume
                  </Button>
                ) : (
                  <Button onClick={handlePause} variant="outline" className="flex-1">
                    <PauseIcon className="mr-2 h-4 w-4" />
                    Pause
                  </Button>
                )}
                <Button onClick={handleStop} variant="destructive" className="flex-1">
                  <StopCircle className="mr-2 h-4 w-4" />
                  Stop
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
            <CardDescription>Your recent coding sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 border-b bg-muted/50 px-4 py-2 text-sm font-medium">
                  <div className="col-span-5">Project</div>
                  <div className="col-span-3">Language</div>
                  <div className="col-span-2">Duration</div>
                  <div className="col-span-2 text-right">Date</div>
                </div>
                <div className="divide-y">
                  {[
                    { project: 'CodeNeko', language: 'TypeScript', duration: '2h 15m', date: 'Today' },
                    { project: 'Personal Website', language: 'HTML/CSS', duration: '1h 30m', date: 'Yesterday' },
                    { project: 'Task Manager API', language: 'Python', duration: '3h 45m', date: '2 days ago' },
                  ].map((session, i) => (
                    <div key={i} className="grid grid-cols-12 items-center px-4 py-3">
                      <div className="col-span-5 font-medium">{session.project}</div>
                      <div className="col-span-3">{session.language}</div>
                      <div className="col-span-2">{session.duration}</div>
                      <div className="col-span-2 text-right text-sm text-muted-foreground">{session.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Sessions
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
