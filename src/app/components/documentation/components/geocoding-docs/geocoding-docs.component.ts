import { Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-geocoding-docs',
  templateUrl: './geocoding-docs.component.html',
  standalone: true,
  imports: [CommonModule, JsonPipe]
})
export class GeocodingDocsComponent {
  endpoints = [
    {
      name: 'Geocode',
      method: 'POST',
      path: '/api/geocode/geocode',
      description: 'Convert an address to coordinates',
      requestBody: {
        address: 'string'
      },
      response: {
        latitude: 'number',
        longitude: 'number',
        formatted_address: 'string',
        processing_time_seconds: 'number'
      },
      errorResponses: [
        {
          code: 400,
          message: 'Invalid request format or empty address'
        },
        {
          code: 404,
          message: 'Address not found'
        },
        {
          code: 500,
          message: 'Internal server error'
        }
      ]
    },
    {
      name: 'Reverse Geocode',
      method: 'POST',
      path: '/api/geocode/reverse',
      description: 'Convert coordinates to an address',
      requestBody: {
        latitude: 'number',
        longitude: 'number'
      },
      response: {
        formatted_address: 'string',
        address_components: 'object',
        processing_time_seconds: 'number'
      },
      errorResponses: [
        {
          code: 400,
          message: 'Invalid coordinates'
        },
        {
          code: 404,
          message: 'No address found for coordinates'
        },
        {
          code: 500,
          message: 'Internal server error'
        }
      ]
    },
    {
      name: 'Batch Geocode',
      method: 'POST',
      path: '/api/geocode/batch',
      description: 'Batch geocode multiple addresses',
      requestBody: {
        addresses: 'string[]'
      },
      response: {
        results: 'array',
        processing_time_seconds: 'number',
        total_addresses: 'number',
        successful_results: 'number'
      },
      errorResponses: [
        {
          code: 400,
          message: 'Invalid request format or empty address list'
        },
        {
          code: 500,
          message: 'Internal server error'
        }
      ]
    },
    {
      name: 'Location Details',
      method: 'POST',
      path: '/api/geocode/details',
      description: 'Get detailed location information for coordinates',
      requestBody: {
        latitude: 'number',
        longitude: 'number',
        detail_level: 'string (basic|full)'
      },
      response: {
        address_details: 'object',
        timezone: 'string',
        elevation: 'number',
        processing_time_seconds: 'number'
      },
      errorResponses: [
        {
          code: 400,
          message: 'Invalid coordinates'
        },
        {
          code: 404,
          message: 'Location details not found'
        },
        {
          code: 500,
          message: 'Internal server error'
        }
      ]}];
}