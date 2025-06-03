import { Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-matrix-docs',
  templateUrl: './matrix-docs.component.html',
  standalone: true,
  imports: [CommonModule, JsonPipe]
})
export class MatrixDocsComponent {
  endpoints = [
    {
      name: 'Calculate Matrix',
      method: 'POST',
      path: '/api/matrix/calculate',
      description: 'Calculate optimal route for multiple locations with optional Pickup-Delivery Problem (PDP) mode',
      requestBody: {
        locations: [
          {
            latitude: 'number',
            longitude: 'number',
            type: 'string (pickup | delivery)',
            location_id: 'string',
            package_id: 'string (optional)'
          }
        ],
        pdp: 'boolean',
        current_location: {
          latitude: 'number',
          longitude: 'number'
        }
      },
      response: {
        optimal_route: 'array',
        minimum_distance_km: 'number',
        estimated_travel_time_seconds: 'number',
        estimated_travel_time: 'string',
        optimal_route_coordinates: 'array',
        processing_time_seconds: 'number'
      },
      errorResponses: [
        {
          code: 400,
          message: 'Invalid request format. Required fields: locations, pdp, current_location'
        },
        {
          code: 400,
          message: 'current_location must contain latitude and longitude'
        },
        {
          code: 400,
          message: 'In PDP mode, each location must have latitude, longitude, type, and location_id'
        },
        {
          code: 400,
          message: 'Each location must have latitude and longitude'
        },
        {
          code: 500,
          message: 'Failed to calculate optimal route'
        },
        {
          code: 500,
          message: 'Internal server error'
        }
      ]
    }
  ];
}