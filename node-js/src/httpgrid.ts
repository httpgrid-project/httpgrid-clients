import axios from 'axios';
import { Application, Endpoint, EndpointMessage, Message } from './entities';
import { EndpointRequest } from './value-objects';

export class HTTPgrid {
  public readonly application: HTTPgridApplicationClient;

  public readonly endpoint: HTTPgridEndpointClient;

  public readonly endpointMessage: HTTPgridEndpointMessageClient;

  public readonly message: HTTPgridMessageClient;

  constructor(
    protected token: string,
    protected domain: string = 'https://api.httpgrid.com'
  ) {
    this.application = new HTTPgridApplicationClient(
      `${this.domain}/api/v1`,
      this.token
    );

    this.endpoint = new HTTPgridEndpointClient(
      `${this.domain}/api/v1`,
      this.token
    );

    this.endpointMessage = new HTTPgridEndpointMessageClient(
      `${this.domain}/api/v1`,
      this.token
    );

    this.message = new HTTPgridMessageClient(
      `${this.domain}/api/v1`,
      this.token
    );
  }
}

export class HTTPgridApplicationClient {
  constructor(protected url: string, protected token: string) {}

  public async create(application: {
    name: string;
    uid: string;
  }): Promise<Application> {
    const response = await axios.post<Application>(
      `${this.url}/applications`,
      application,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );

    return response.data;
  }

  public async delete(applicationId: string): Promise<Application> {
    const response = await axios.delete<Application>(
      `${this.url}/applications/${applicationId}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );

    return response.data;
  }

  public async find(applicationId: string): Promise<Application | null> {
    const response = await axios.get<Application>(
      `${this.url}/applications/${applicationId}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        validateStatus: (status) => {
          return status === 200 || status === 404 ? true : false;
        },
      }
    );

    return response.data;
  }
}

export class HTTPgridEndpointClient {
  constructor(protected url: string, protected token: string) {}

  public async create(
    applicationId: string,
    endpointRequest: EndpointRequest
  ): Promise<Endpoint> {
    const response = await axios.post<Endpoint>(
      `${this.url}/applications/${applicationId}/endpoints`,
      endpointRequest,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );

    return response.data;
  }

  public async find(
    applicationId: string,
    endpointId: string
  ): Promise<Endpoint | null> {
    const response = await axios.get<Endpoint>(
      `${this.url}/applications/${applicationId}/endpoints/${endpointId}`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
        validateStatus: (status) => {
          return status === 200 || status === 404 ? true : false;
        },
      }
    );

    return response.data;
  }

  public async update(
    applicationId: string,
    endpointId: string,
    endpointRequest: EndpointRequest
  ): Promise<Endpoint> {
    const response = await axios.put<Endpoint>(
      `${this.url}/applications/${applicationId}/endpoints/${endpointId}`,
      endpointRequest,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );

    return response.data;
  }
}

export class HTTPgridMessageClient {
  constructor(protected url: string, protected token: string) {}

  public async create(
    applicationId: string,
    message: {
      eventType: string;
      channels: Array<string>;
      payload: any;
    }
  ): Promise<Message> {
    const response = await axios.post<Message>(
      `${this.url}/applications/${applicationId}/messages`,
      message,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );

    return response.data;
  }
}

export class HTTPgridEndpointMessageClient {
  constructor(protected url: string, protected token: string) {}

  public async findAll(
    applicationId: string,
    messageId: string
  ): Promise<Array<EndpointMessage>> {
    const response = await axios.get<Array<EndpointMessage>>(
      `${this.url}/applications/${applicationId}/messages/${messageId}/endpoint-messages`,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );

    return response.data;
  }
}
