// Type definitions for Google Maps Places API
declare global {
  interface Window {
    google: typeof google;
  }
}

declare namespace google.maps.places {
  class PlacesService {
    constructor(attrContainer: HTMLDivElement | google.maps.Map);
    getDetails(
      request: PlaceDetailsRequest,
      callback: (result: PlaceResult | null, status: PlacesServiceStatus) => void
    ): void;
  }

  interface PlaceDetailsRequest {
    placeId: string;
    fields?: string[];
    language?: string;
  }

  interface PlaceResult {
    name?: string;
    rating?: number;
    reviews?: PlaceReview[];
    user_ratings_total?: number;
  }

  interface PlaceReview {
    author_name?: string;
    rating?: number;
    text?: string;
    time?: number;
    profile_photo_url?: string;
    relative_time_description?: string;
  }

  enum PlacesServiceStatus {
    OK = 'OK',
    ZERO_RESULTS = 'ZERO_RESULTS',
    INVALID_REQUEST = 'INVALID_REQUEST',
    OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
    REQUEST_DENIED = 'REQUEST_DENIED',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  }
}

export {};
