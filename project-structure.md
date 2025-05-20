# CodeNeko Project Structure

```
CodeNeko/
├── Frontend/                      # Frontend application (existing)
│   ├── public/                    # Static assets
│   ├── src/
│   │   ├── app/                   # Application core
│   │   │   ├── auth/              # Authentication module
│   │   │   ├── dashboard/         # Dashboard module
│   │   │   ├── leaderboard/       # Leaderboard module
│   │   │   ├── settings/          # Settings module
│   │   │   ├── cat-companion/     # Cat companion module
│   │   │   └── error/             # Error handling pages
│   │   ├── components/            # Shared components
│   │   ├── hooks/                 # Custom hooks
│   │   ├── lib/                   # Utilities and helpers
│   │   ├── routes/                # Route definitions
│   │   ├── services/              # API service clients
│   │   ├── store/                 # State management
│   │   ├── types/                 # TypeScript type definitions
│   │   ├── App.tsx                # Main App component with routing
│   │   └── main.tsx               # Entry point
│   └── ...
│
├── Backend/                       # Backend services
│   ├── shared/                    # Shared utilities and configurations
│   │   ├── config/                # Configuration files
│   │   ├── middleware/            # Common middleware
│   │   ├── models/                # Shared data models
│   │   └── utils/                 # Utility functions
│   │
│   ├── services/                  # Microservices
│   │   ├── auth-service/          # Authentication service
│   │   │   ├── src/               # Source code
│   │   │   ├── tests/             # Tests
│   │   │   ├── package.json       # Dependencies
│   │   │   └── tsconfig.json      # TypeScript config
│   │   │
│   │   ├── activity-service/      # Activity tracking service
│   │   │   ├── src/
│   │   │   ├── tests/
│   │   │   ├── package.json
│   │   │   └── tsconfig.json
│   │   │
│   │   ├── stats-service/         # Statistics and analytics service
│   │   │   ├── src/
│   │   │   ├── tests/
│   │   │   ├── package.json
│   │   │   └── tsconfig.json
│   │   │
│   │   ├── ai-insights-service/   # AI-powered insights service
│   │   │   ├── src/
│   │   │   ├── tests/
│   │   │   ├── package.json
│   │   │   └── tsconfig.json
│   │   │
│   │   └── gamification-service/  # Gamification and achievements service
│   │       ├── src/
│   │       ├── tests/
│   │       ├── package.json
│   │       └── tsconfig.json
│   │
│   ├── api-gateway/               # API Gateway for service orchestration
│   │   ├── src/
│   │   ├── tests/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── docker-compose.yml         # Docker compose for local development
│
└── README.md                      # Project documentation
```
