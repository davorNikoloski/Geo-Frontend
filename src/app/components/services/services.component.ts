// src/app/pages/services/services.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  services = [
    {
      id: 'geocoding',
      title: 'Geocoding & Reverse Geocoding',
      icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
      description: 'Transform addresses into precise coordinates and vice versa with our high-accuracy geocoding services.',
      features: [
        'Convert street addresses to latitude/longitude',
        'Reverse geocode coordinates to human-readable addresses',
        'Global coverage with local precision',
        'Batch processing capabilities'
      ],
      useCases: [
        'Location-based app features',
        'Address validation systems',
        'Asset tracking solutions',
        'Delivery route planning'
      ]
    },
    {
    id: 'matrix',
    title: 'Matrix API',
    icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
    description: 'Calculate approximate travel times and distances between multiple points in a single efficient request.',
    features: [
        'Distance matrix for multiple origins/destinations',
        'Estimated time matrix based on average speeds',
        'Optimized for large datasets',
        'Pickup-Delivery Problem (PDP) solver'
    ],
    useCases: [
        'Logistics and fleet management',
        'Ride-sharing applications',
        'Service area calculations',
        'Multi-stop route optimization'
    ]
    },

    {
    id: 'directions',
    title: 'Directions API',
    icon: 'M9 5l7 7-7 7',
    description: 'Get turn-by-turn navigation routes optimized for your specific needs and constraints.',
    features: [
        'Multi-modal routing (driving, walking, cycling)',
        'Turn-by-turn directions',
        'Pickup-Delivery Problem (PDP) optimization',
        'Reliable fallback routing using OSMnx'
    ],
    useCases: [
        'Navigation applications',
        'Delivery route planning',
        'Field service routing',
        'Accessibility pathfinding'
    ]
    },
    {
      id: 'isochrone',
      title: 'Isochrone API',
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      description: 'Visualize areas reachable within specific time or distance constraints from a location.',
      features: [
        'Create time-based reachability polygons',
        'Distance-based isochrones',
        'Multi-modal accessibility areas',
        'Customizable interval settings'
      ],
      useCases: [
        'Service area analysis',
        'Facility location planning',
        'Emergency response planning',
        'Real estate market analysis'
      ]
    }
  ];
}