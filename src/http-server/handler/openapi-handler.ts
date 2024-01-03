/*
 * The code is licensed under the MIT License and was authored by Yaroslav Gaponov.
 */

import { IncomingMessage, ServerResponse } from "http";
import { HttpRouter } from "../http-router";
import { IHandler } from "../../interface";

export class OpenApiHandler implements IHandler {

  hook(router: HttpRouter): HttpRouter {
    return router
      .addHanlder("GET", "/", this.sendHtml.bind(this))
      .addHanlder("GET", "/index.yaml", this.sendYaml.bind(this))
      ;
  }

  private sendYaml(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
    const INDEX_YAML = `
        openapi: 3.0.0
        info:
          title: Informer API
          version: 0.0.1
        paths:
          /{provider}:
            post:
              summary: Send notification message
              description: |
                Endpoint for sending notification message via email, google или apple.
              parameters:
                - name: provider
                  in: path
                  description: provider (email/google/apple)
                  required: true
                  schema:
                    type: string
                    enum: [email, google, apple]
              requestBody:
                  description: message
                  required: true
                  content:
                    application/json:
                      schema:
                        type: object
                        properties:
                          from:
                            type: string
                          to:
                            type: string
                          subject:
                            type: string
                          text:
                            type: string
              responses:
                '200':
                  description: success
                '404':
                  description: not found
                '500':
                  description: server error
        
        `;
    res.writeHead(200, { 'Content-Type': 'application/yaml' });
    res.end(INDEX_YAML);
  }

  private sendHtml(req: IncomingMessage, res: ServerResponse<IncomingMessage>): void {
    const INDEX_HTML = `
        <html>
        <head>    
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@3.17.0/swagger-ui.css">
            <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js"></script>
            <script>
        
                function render() {
                    var ui = SwaggerUIBundle({
                        url:  "index.yaml",
                        dom_id: '#swagger-ui',
                        presets: [
                            SwaggerUIBundle.presets.apis,
                            SwaggerUIBundle.SwaggerUIStandalonePreset
                        ]
                    });
                }
        
            </script>
        </head>
        
        <body onload="render()">
            <div id="swagger-ui"></div>
        </body>
        </html>
        `;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(INDEX_HTML);
  }

}