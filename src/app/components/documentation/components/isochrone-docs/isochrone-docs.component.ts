import { Component } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-isochrone-docs',
  templateUrl: './isochrone-docs.component.html',
  standalone: true,
  imports: [CommonModule, JsonPipe]
})
export class IsochroneDocsComponent {
  endpoints = [
    {
      name: 'Calculate Isochrones',
      method: 'POST',
      path: '/api/isochrone/calculate',
      description: 'Calculate isochrones (travel time polygons) from a starting point',
      requestBody: {
        latitude: 'number',
        longitude: 'number',
        travel_times: 'number[] (default: [5, 10, 15])',
        travel_mode: 'string (drive | walk | bike, default: drive)',
        simplify_tolerance: 'number (default: 20)'
      },
      response: {
        isochrones: 'array',
        center: {
          latitude: 'number',
          longitude: 'number'
        },
        graph_nodes: 'number',
        graph_edges: 'number',
        total_processing_time_seconds: 'number',
        cache_info: {
          memory_graphs: 'number',
          cache_hits: 'string'
        }
      },
      errorResponses: [
        {
          code: 400,
          message: 'Invalid JSON data'
        },
        {
          code: 400,
          message: 'Missing required fields: latitude, longitude'
        },
        {
          code: 400,
          message: 'Coordinates must be numbers'
        },
        {
          code: 400,
          message: 'Latitude must be between -90 and 90'
        },
        {
          code: 400,
          message: 'Longitude must be between -180 and 180'
        },
        {
          code: 400,
          message: 'Invalid travel mode. Must be one of: drive, walk, bike'
        },
        {
          code: 400,
          message: 'travel_times must be a non-empty list'
        },
        {
          code: 400,
          message: 'Maximum 10 travel times allowed'
        },
        {
          code: 400,
          message: 'Travel times must be positive numbers ≤ 120 minutes'
        },
        {
          code: 400,
          message: 'simplify_tolerance must be a non-negative number'
        },
        {
          code: 500,
          message: 'Internal server error'
        }
      ]
    },
    {
      name: 'Isochrones GeoJSON',
      method: 'POST',
      path: '/api/isochrone/geojson',
      description: 'Calculate isochrones and return as GeoJSON format for mapping',
      requestBody: {
        latitude: 'number',
        longitude: 'number',
        travel_times: 'number[] (default: [5, 10, 15])',
        travel_mode: 'string (drive | walk | bike, default: drive)',
        simplify_tolerance: 'number (default: 20)'
      },
      response: {
        type: 'string (FeatureCollection)',
        features: 'array',
        processing_time_seconds: 'number',
        bounds: 'array',
        center: {
          latitude: 'number',
          longitude: 'number'
        },
        travel_mode: 'string',
        graph_info: {
          nodes: 'number',
          edges: 'number'
        }
      },
      errorResponses: [
        {
          code: 400,
          message: 'Invalid JSON data'
        },
        {
          code: 400,
          message: 'Missing required fields: latitude, longitude'
        },
        {
          code: 400,
          message: 'Coordinates must be numbers'
        },
        {
          code: 400,
          message: 'Latitude must be between -90 and 90'
        },
        {
          code: 400,
          message: 'Longitude must be between -180 and 180'
        },
        {
          code: 400,
          message: 'Invalid travel mode. Must be one of: drive, walk, bike'
        },
        {
          code: 400,
          message: 'travel_times must be a non-empty list'
        },
        {
          code: 400,
          message: 'Maximum 10 travel times allowed'
        },
        {
          code: 400,
          message: 'Travel times must be positive numbers ≤ 120 minutes'
        },
        {
          code: 500,
          message: 'Failed to generate GeoJSON'
        },
        {
          code: 500,
          message: 'Internal server error'
        }
      ]
    },
    {
      name: 'Compare Isochrones',
      method: 'POST',
      path: '/api/isochrone/compare',
      description: 'Compare isochrones for different travel modes using parallel processing',
      requestBody: {
        latitude: 'number',
        longitude: 'number',
        travel_time: 'number (default: 15)',
        travel_modes: 'string[] (drive | walk | bike, default: [drive, walk, bike])',
        simplify_tolerance: 'number (default: 20)'
      },
      response: {
        center: {
          latitude: 'number',
          longitude: 'number'
        },
        travel_time_minutes: 'number',
        comparisons: {
          '[mode]': {
            area_km2: 'number',
            polygon_coordinates: 'array',
            reachable_nodes: 'number',
            processing_time_seconds: 'number'
          }
        },
        summary: {
          largest_area: {
            mode: 'string',
            area_km2: 'number'
          },
          smallest_area: {
            mode: 'string',
            area_km2: 'number'
          },
          area_ratio_largest_to_smallest: 'number'
        },
        total_processing_time_seconds: 'number'
      },
      errorResponses: [
        {
          code: 400,
          message: 'Invalid JSON data'
        },
        {
          code: 400,
          message: 'Missing required fields: latitude, longitude, travel_time'
        },
        {
          code: 400,
          message: 'Coordinates must be numbers'
        },
        {
          code: 400,
          message: 'Latitude must be between -90 and 90'
        },
        {
          code: 400,
          message: 'Longitude must be between -180 and 180'
        },
        {
          code: 400,
          message: 'travel_timeプログラミング must be a positive number ≤ 120 minutes'
        },
        {
          code: 400,
          message: 'Invalid travel modes: [modes]. Must be: drive, walk, bike'
        },
        {
          code: 400,
          message: 'Maximum 3 travel modes allowed'
        },
        {
          code: 500,
          message: 'Internal server error'
        }
      ]
    },
    {
      name: 'Isochrone Statistics',
      method: 'POST',
      path: '/api/isochrone/stats',
      description: 'Get detailed statistics about isochrones',
      requestBody: {
        latitude: 'number',
        longitude: 'number',
        travel_times: 'number[] (default: [5, 10, 15])',
        travel_mode: 'string (drive | walk | bike, default: drive)'
      },
      response: {
        center: {
          latitude: 'number',
          longitude: 'number'
        },
        travel_mode: 'string',
        bounds: 'array',
        statistics: 'array',
        graph_info: {
          total_nodes: 'number',
          total_edges: 'number',
          network_density: 'number'
        },
        processing_info: {
          calculation_time_seconds: 'number',
          total_time_seconds: 'number'
        },
        area_growth_analysis: 'array'
      },
      errorResponses: [
        {
          code: 400,
          message: 'Invalid JSON data'
        },
        {
          code: 400,
          message: 'Missing required fields: latitude, longitude'
        },
        {
          code: 400,
          message: 'Coordinates must be numbers'
        },
        {
          code: 400,
          message: 'Latitude must be between -90 and 90'
        },
        {
          code: 400,
          message: 'Longitude must be between -180 and 180'
        },
        {
          code: 400,
          message: 'Invalid travel mode. Must be one of: drive, walk, bike'
        },
        {
          code: 400,
          message: 'travel_times must be a non-empty list'
        },
        {
          code: 400,
          message: 'Maximum 10 travel times allowed'
        },
        {
          code: 400,
          message: 'Travel times must be positive numbers ≤ 120 minutes'
        },
        {
          code: 500,
          message: 'Internal server error'
        }
      ]
    },
    {
      name: 'Batch Isochrones',
      method: 'POST',
      path: '/api/isochrone/batch',
      description: 'Calculate isochrones for multiple locations in parallel',
      requestBody: {
        locations: [
          {
            latitude: 'number',
            longitude: 'number',
            name: 'string (optional)'
          }
        ],
        travel_times: 'number[] (default: [5, 10, 15])',
        travel_mode: 'string (drive | walk | bike, default: drive)'
      },
      response: {
        travel_mode: 'string',
        travel_times: 'number[]',
        total_locations: 'number',
        results: 'array',
        summary: {
          successful_calculations: 'number',
          failed_calculations: 'number',
          average_processing_time: 'number'
        },
        total_processing_time_seconds: 'number'
      },
      errorResponses: [
        {
          code: 400,
          message: 'Invalid JSON data'
        },
        {
          code: 400,
          message: 'locations must be a non-empty list'
        },
        {
          code: 400,
          message: 'Maximum 10 locations allowed'
        },
        {
          code: 400,
          message: 'Location must be an object'
        },
        {
          code: 400,
          message: 'Location missing latitude or longitude'
        },
        {
          code: 400,
          message: 'Coordinates must be numbers'
        },
        {
          code: 400,
          message: 'Latitude must be between -90 and 90'
        },
        {
          code: 400,
          message: 'Longitude must be between -180 and 180'
        },
        {
          code: 400,
          message: 'Invalid travel mode. Must be one of: drive, walk, bike'
        },
        {
          code: 400,
          message: 'travel_times must be a non-empty list'
        },
        {
          code: 400,
          message: 'Maximum 10 travel times allowed'
        },
        {
          code: 400,
          message: 'Travel times must be positive numbers ≤ 120 minutes'
        },
        {
          code: 500,
          message: 'Internal server error'
        }
      ]
    },
    {
      name: 'Cache Status',
      method: 'GET',
      path: '/api/isochrone/cache/status',
      description: 'Get current cache status and statistics',
      requestBody: {},
      response: {
        memory_cache: {
          current_graphs: 'number',
          max_graphs: 'number',
          cached_keys: 'string[]'
        },
        disk_cache: {
          cache_folder: 'string',
          cached_files: 'string[]',
          total_files: 'number'
        },
        background_downloads: {
          queue_size: 'number',
          downloads_in_progress: 'number'
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
      name: 'Clear Cache',
      method: 'POST',
      path: '/api/isochrone/cache/clear',
      description: 'Clear cache (memory and/or disk)',
      requestBody: {
        clear_memory: 'boolean (default: true)',
        clear_disk: 'boolean (default: false)'
      },
      response: {
        cleared: 'string[]'
      },
      errorResponses: [
        {
          code: 500,
          message: 'Internal server error'
        }
      ]
    },
    {
      name: 'Preload Graphs',
      method: 'POST',
      path: '/api/isochrone/preload',
      description: 'Preload graphs for specified locations',
      requestBody: {
        locations: [
          {
            latitude: 'number',
            longitude: 'number',
            name: 'string (optional)'
          }
        ],
        travel_modes: 'string[] (drive | walk | bike, default: [drive])',
        distances: 'number[] (default: [2000, 5000])'
      },
      response: {
        preload_results: 'array',
        successful: 'number',
        failed: 'number'
      },
      errorResponses: [
        {
          code: 400,
          message: 'Invalid JSON data'
        },
        {
          code: 400,
          message: 'No locations specified'
        },
        {
          code: 400,
          message: 'Maximum 20 locations allowed for preloading'
        },
        {
          code: 500,
          message: 'Internal server error'
        }
      ]
    }
  ];
}