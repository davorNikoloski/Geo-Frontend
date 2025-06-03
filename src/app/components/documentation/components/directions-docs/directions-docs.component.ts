import { Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-directions-docs',
  templateUrl: './directions-docs.component.html',
  standalone: true,
  imports: [CommonModule, JsonPipe]
})
export class DirectionsDocsComponent {
  endpoints = [
    {
      name: 'Calculate Route',
      method: 'POST',
      path: '/api/directions/route',
      description: 'Calculate a route with multiple waypoints and optional optimization',
      requestBody: {
        waypoints: [
          {
            lat: 'number',
            lng: 'number'
          }
        ],
        transport_mode: 'string (driving | foot | bike, default: driving)',
        optimize_route: 'boolean (default: false)',
        use_osmnx_fallback: 'boolean (default: false)',
        route_type: 'string (shortest, default: shortest)'
      },
      response: {
        status: 'string (success | error)',
        source: 'string',
        distance: 'number',
        duration: 'number',
        duration_str: 'string',
        steps: 'array',
        geometry: 'array',
        decoded_polyline: 'array',
        polyline: 'string',
        waypoints: 'array',
        metadata: 'object',
        api_processing_time_seconds: 'number'
      },
      errorResponses: [
        {
          code: 400,
          message: 'Invalid request format. Required field: waypoints'
        },
        {
          code: 400,
          message: 'At least 2 waypoints are required'
        },
        {
          code: 400,
          message: 'Waypoint must have "lat" and "lng" fields'
        },
        {
          code: 400,
          message: 'Waypoint coordinates must be numeric'
        },
        {
          code: 400,
          message: 'Invalid coordinates. Lat: [-90,90], Lng: [-180,180]'
        },
        {
          code: 400,
          message: 'Invalid transport mode'
        },
        {
          code: 500,
          message: 'Internal server error'
        }
      ]
    },
    {
      name: 'Calculate PDP Route',
      method: 'POST',
      path: '/api/directions/route_pdp',
      description: 'Calculate an optimized route for Pickup-Delivery Problem (PDP)',
      requestBody: {
        current_location: {
          latitude: 'number',
          longitude: 'number'
        },
        locations: [
          {
            latitude: 'number',
            longitude: 'number',
            type: 'string (pickup | delivery)',
            location_id: 'string',
            package_id: 'string (optional)'
          }
        ],
        transport_mode: 'string (driving | foot | bike, default: driving)'
      },
      response: {
        status: 'string (success | partial_success | error)',
        route_type: 'string (pdp)',
        transport_mode: 'string',
        current_location: 'object',
        pickup_count: 'number',
        delivery_count: 'number',
        total_locations: 'number',
        optimization: {
          optimal_route: 'array',
          optimal_route_coordinates: 'array',
          minimum_distance_km: 'number',
          estimated_travel_time_seconds: 'number',
          estimated_travel_time: 'string'
        },
        directions: {
          source: 'string',
          distance: 'number',
          duration: 'number',
          duration_str: 'string',
          steps: 'array',
          geometry: 'array',
          decoded_polyline: 'array',
          polyline: 'string',
          waypoints: 'array',
          metadata: 'object'
        },
        api_processing_time_seconds: 'number'
      },
      errorResponses: [
        {
          code: 400,
          message: 'Invalid request format. Required fields: current_location, locations'
        },
        {
          code: 400,
          message: 'current_location must contain latitude and longitude fields'
        },
        {
          code: 400,
          message: 'current_location coordinates must be numeric'
        },
        {
          code: 400,
          message: 'Invalid coordinates. Lat: [-90,90], Lng: [-180,180]'
        },
        {
          code: 400,
          message: 'At least 2 locations (pickup and delivery pairs) are required for PDP'
        },
        {
          code: 400,
          message: 'Location must contain: latitude, longitude, type, location_id'
        },
        {
          code: 400,
          message: 'Location has invalid type. Must be one of: [pickup, delivery]'
        },
        {
          code: 400,
          message: 'Location must have valid location_id (non-empty string or number)'
        },
        {
          code: 400,
          message: 'Invalid transport mode'
        },
        {
          code: 400,
          message: 'At least one pickup location is required for PDP'
        },
        {
          code: 400,
          message: 'At least one delivery location is required for PDP'
        },
        {
          code: 500,
          message: 'Failed to calculate optimal PDP route'
        },
        {
          code: 500,
          message: 'No optimized route coordinates returned from matrix calculation'
        },
        {
          code: 500,
          message: 'Internal server error'
        }
      ]
    },
    {
      name: 'Calculate Simple Route',
      method: 'POST',
      path: '/api/directions/simple',
      description: 'Calculate a simple route between origin and destination',
      requestBody: {
        origin: {
          lat: 'number',
          lng: 'number'
        },
        destination: {
          lat: 'number',
          lng: 'number'
        },
        transport_mode: 'string (driving | foot | bike, default: driving)',
        alternatives: 'boolean (default: false)'
      },
      response: {
        status: 'string (success | error)',
        source: 'string',
        distance: 'number',
        duration: 'number',
        duration_str: 'string',
        steps: 'array',
        geometry: 'array',
        decoded_polyline: 'array',
        polyline: 'string',
        waypoints: 'array',
        metadata: 'object',
        api_processing_time_seconds: 'number'
      },
      errorResponses: [
        {
          code: 400,
          message: 'Invalid request format. Required fields: origin, destination'
        },
        {
          code: 400,
          message: 'Origin/destination must have "lat" and "lng" fields'
        },
        {
          code: 400,
          message: 'Origin/destination coordinates must be numeric'
        },
        {
          code: 400,
          message: 'Invalid coordinates. Lat: [-90,90], Lng: [-180,180]'
        },
        {
          code: 400,
          message: 'Invalid transport mode'
        },
        {
          code: 500,
          message: 'Internal server error'
        }
      ]
    },
    {
      name: 'Get Transport Modes',
      method: 'GET',
      path: '/api/directions/modes',
      description: 'Get supported transport modes and their configurations',
      requestBody: {},
      response: {
        status: 'string (success | error)',
        supported_modes: 'array',
        mode_details: {
          '[mode]': {
            osrm_server: 'string',
            default_speed_kph: 'number',
            osmnx_network_type: 'string'
          }
        },
        aliases: {
          driving: 'array',
          foot: 'array',
          bike: 'array'
        }
      },
      errorResponses: [
        {
          code: 500,
          message: 'Internal server error'
        }
      ]
    },
    {
      name: 'Health Check',
      method: 'GET',
      path: '/api/directions/health',
      description: 'Health check endpoint for directions service',
      requestBody: {},
      response: {
        status: 'string (healthy | unhealthy)',
        service: 'string',
        timestamp: 'number',
        endpoints: {
          'POST /route': 'string',
          'POST /route_pdp': 'string',
          'POST /simple': 'string',
          'GET /modes': 'string',
          'GET /health': 'string'
        }
      },
      errorResponses: [
        {
          code: 500,
          message: 'Internal server error'
        }
      ]
    }
  ];
}