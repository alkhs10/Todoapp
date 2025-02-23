
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src


COPY ["API.csproj", "."]
RUN dotnet restore "API.csproj"


COPY . .
RUN dotnet publish "API.csproj" -c Release -o /app


FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
EXPOSE 5108


COPY --from=build /app .

ENTRYPOINT ["dotnet", "API.dll", "--urls", "http://0.0.0.0:5108"]