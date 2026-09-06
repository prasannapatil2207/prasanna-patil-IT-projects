# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

# Copy project file
COPY ["ProductManagement.csproj", "./"]

# Restore dependencies
RUN dotnet restore "ProductManagement.csproj"

# Copy all project files
COPY . .

# Publish application
RUN dotnet publish "ProductManagement.csproj" \
    -c Release \
    -o /app/publish \
    /p:UseAppHost=false


# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

WORKDIR /app

# Copy published application
COPY --from=build /app/publish .

# Render provides the PORT environment variable
ENV ASPNETCORE_URLS=http://0.0.0.0:${PORT}

# Start application
ENTRYPOINT ["dotnet", "ProductManagement.dll"]
