# 🐳 Docker & Security Guide for @acme/server

This guide explains how to build, run, and secure the NestJS API server using Docker. Follow these steps from the root of the repository.

---

## Build the Docker Image

```sh
# Build the production Docker image
docker build --rm -f api/server/docker/Dockerfile.prod -t acme-server:latest .
```

## Run the Docker Container

```sh
# Run the container, mapping port 3000 on your host to the container
docker run -p 3000:3000 -e PORT=3000 acme-server:latest
```

- The server will be available at [http://localhost:3000](http://localhost:3000) by default.
- You can override the port by changing the `-p` and `-e PORT` values.

## Environment Variables

You can pass additional environment variables using the `-e` flag. For example:

```sh
docker run -p 3000:3000 -e PORT=3000 -e NODE_ENV=production acme-server:latest
```

---

# 🛡️ Docker Security Guide

This section outlines security measures implemented in the Dockerfiles and provides guidance for secure container operation.

## Security Features Implemented

### 1. Secrets Management

- Uses `--mount=type=secret` to avoid exposing credentials in build logs
- `.npmrc.prod` should only contain registry config, not hardcoded tokens
- Use environment variables or external secret management for tokens

### 2. Multi-stage Build Security

- Minimal production image with only necessary runtime dependencies
- Unnecessary packages and build tools removed from final stage
- Read-only filesystem for application code

### 3. Non-root User

- Runs as non-root user `nestjs` (UID 1001)
- Proper file ownership and permissions
- Shell access disabled (`/sbin/nologin`)

### 4. Filesystem Security

- Application code set to read-only (555 permissions)
- Temporary directories can be mounted as needed
- No write access to application files at runtime

## Secure Runtime Configuration

For maximum hardening, run the container with these flags:

```sh
docker run \
  --cap-drop=ALL \
  --security-opt=no-new-privileges \
  --read-only \
  --tmpfs /tmp \
  --tmpfs /var/tmp \
  -p 3000:49252 \
  --name nestjs-server \
  acme-server:latest
```

**Flags explained:**

- `--cap-drop=ALL`: Removes all Linux capabilities
- `--security-opt=no-new-privileges`: Prevents privilege escalation
- `--read-only`: Makes the entire filesystem read-only
- `--tmpfs /tmp --tmpfs /var/tmp`: Writable temp dirs in memory
- Port mapping: Only expose necessary ports

## Docker Compose Security Example

```yaml
version: '3.8'
services:
  nestjs-server:
    image: acme-server:latest
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    read_only: true
    tmpfs:
      - /tmp
      - /var/tmp
    ports:
      - '3000:49252'
    restart: unless-stopped
```

## Build Security

### Secret Management

```sh
# Build with secret file
echo "//registry.npmjs.org/:_authToken=your-token" > .npmrc-secret
docker build --rm --secret id=npmrc,src=.npmrc-secret -f Dockerfile.prod .
rm .npmrc-secret
```

### Scanning

```sh
# Scan for vulnerabilities
docker scout cves acme-server:latest
# or
trivy image acme-server:latest
```

## Additional Security Recommendations

1. **Regular Updates**: Rebuild images regularly for security updates
2. **Vulnerability Scanning**: Integrate scanning in CI/CD
3. **Secret Rotation**: Rotate API tokens and credentials regularly
4. **Network Security**: Use custom networks, limit container communication
5. **Resource Limits**: Set memory and CPU limits
6. **Logging**: Ensure proper logging without exposing sensitive data

## Monitoring and Compliance

- Implement runtime security monitoring, file integrity, and network analysis
- Set up resource usage alerts
- This config helps meet CIS Docker Benchmark, NIST, SOC 2, ISO 27001
- For production, consider runtime security tools, image signing, admission controllers, and network policies

---

_This guide is for the `@acme/server` package. For other services, see their respective Docker guides._
