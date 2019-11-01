---
title: Google
---

# Google

Visit Google Cloud Console
Click CREATE PROJECT button
Enter Project Name, then click CREATE
Then select APIs & auth from the sidebar and click on Credentials tab
Click CREATE NEW CLIENT ID button
    Application Type: Web Application
    Authorized Javascript origins: http://localhost:3000
    Authorized redirect URI: http://localhost:3000

Note: Make sure you have turned on Contacts API and Google+ API in the APIs tab.

## Obtaining OAuth Keys

Visit Google Cloud Console
Click CREATE PROJECT button
Enter Project Name, then click CREATE
Then select APIs & auth from the sidebar and click on Credentials tab
Click CREATE NEW CLIENT ID button
Application Type: Web Application
Authorized Javascript origins: http://localhost:3000
Authorized redirect URI: http://localhost:3000

Note: Make sure you have turned on Contacts API and Google+ API in the APIs tab.

## Geonames full text search

  ToponymSearchCriteria searchCriteria = new ToponymSearchCriteria();
  searchCriteria.setQ("zurich");
  ToponymSearchResult searchResult = WebService.search(searchCriteria);
  for (Toponym toponym : searchResult.toponyms) {
     System.out.println(toponym.getName()+" "+ toponym.getCountryName());
  }

## Reverse Geocoding

Find next postal codes for given latitude and longitude

PostalCodeSearchCriteria postalCodeSearchCriteria = new PostalCodeSearchCriteria();
postalCodeSearchCriteria.setLatitude(37.373636);
postalCodeSearchCriteria.setLongitude(-121.972146);
List<PostalCode> postalCodes = WebService.findNearbyPostalCodes(postalCodeSearchCriteria);
  
GooglePlaceDetail(super=io.datalayer.droids.google.places.model.GooglePlaceDetail@2ac702f7, 

result=GooglePlaceDetailResult(super=aos.droids.google.places.model.GooglePlaceDetailResult@6f93bc11, 
id=1d4048472451bd45c85edba485db7d8da6abad75, 

name=Moscone Center South,
 reference=CoQBdwAAAAn8KA4zZV6C2Du-3qnpg_8OqiVi6-07GHCvoUVZk07zEmrNCIfMs5qBrauhpAHuKQ6KDLtU2NaxhFdoksW697-rWOQQAxhJis5zXQ7bMe_ywMh9qI8sReIZNKHErP-BK4qn1FzVGeN3UefSXUdWYujr_81ug0cq_CWE75F3_bGoEhChVDA83E-XezoV6oFkyRgtGhSJxiQgq5CHJHlVKXlgyY1uGd3eTA, 
 address_components=[
 GooglePlaceDetailResult.AddressComponent(super=aos.droids.google.places.model.GooglePlaceDetailResult$AddressComponent@4c203951, long_name=Moscone Center South, short_name=Moscone Center South, types=[premise]), 
 GooglePlaceDetailResult.AddressComponent(super=aos.droids.google.places.model.GooglePlaceDetailResult$AddressComponent@57931be2, long_name=747, short_name=747, types=[street_number]), GooglePlaceDetailResult.AddressComponent(super=aos.droids.google.places.model.GooglePlaceDetailResult$AddressComponent@7b0bbf58, long_name=Howard St, short_name=Howard St, types=[route]), GooglePlaceDetailResult.AddressComponent(super=aos.droids.google.places.model.GooglePlaceDetailResult$AddressComponent@403f6984, long_name=San Francisco, short_name=SF, types=[locality, political]), GooglePlaceDetailResult.AddressComponent(super=aos.droids.google.places.model.GooglePlaceDetailResult$AddressComponent@3287a10, long_name=San Francisco County, short_name=San Francisco County, types=[administrative_area_level_2, political]), GooglePlaceDetailResult.AddressComponent(super=aos.droids.google.places.model.GooglePlaceDetailResult$AddressComponent@5665b20e, long_name=California, short_name=CA, types=[administrative_area_level_1, political]), GooglePlaceDetailResult.AddressComponent(super=aos.droids.google.places.model.GooglePlaceDetailResult$AddressComponent@2e8ce172, long_name=United States, short_name=US, types=[country, political]), GooglePlaceDetailResult.AddressComponent(super=aos.droids.google.places.model.GooglePlaceDetailResult$AddressComponent@23251b3e, long_name=94103, short_name=94103, types=[postal_code])]))

# Place Types

You may restrict results from a Place Autocomplete request to be of a certain type by passing a types parameter. The parameter specifies a type or a type collection, as listed in the supported types below. If nothing is specified, all types are returned. In general only a single type is allowed. The exception is that you can safely mix the geocode and establishment types, but note that this will have the same effect as specifying no types. The supported types are:

    geocode instructs the Place service to return only geocoding (address) results. Generally, you use this request to disambiguate results where the location specified may be indeterminate.
    establishment instructs the Place service to return only business results.
    the (regions) type collection instructs the Place service to return any result matching the following types:
        locality
        sublocality
        postal_code
        country
        administrative_area1
        administrative_area2
    the (cities) type collection instructs the Place service to return results that match either locality or administrative_area3.

## Supported Place Types

This page lists the supported values for the types property in the Google Places API. Table 1 lists the types you can use in place searches and place additions. Table 2 lists the additional types that may be returned in the place search results.
Table 1: Types supported in place search and addition

You can use the following values in the types filter for place searches and when adding a place.

    accounting
    airport
    amusement_park
    aquarium
    art_gallery
    atm
    bakery
    bank
    bar
    beauty_salon
    bicycle_store
    book_store
    bowling_alley
    bus_station
    cafe
    campground
    car_dealer
    car_rental
    car_repair
    car_wash
    casino
    cemetery
    church
    city_hall
    clothing_store
    convenience_store
    courthouse
    dentist
    department_store
    doctor
    electrician
    electronics_store
    embassy
    establishment
    finance
    fire_station
    florist
    food
    funeral_home
    furniture_store
    gas_station
    general_contractor
    grocery_or_supermarket
    gym
    hair_care
    hardware_store
    health
    hindu_temple
    home_goods_store
    hospital
    insurance_agency
    jewelry_store
    laundry
    lawyer
    library
    liquor_store
    local_government_office
    locksmith
    lodging
    meal_delivery
    meal_takeaway
    mosque
    movie_rental
    movie_theater
    moving_company
    museum
    night_club
    painter
    park
    parking
    pet_store
    pharmacy
    physiotherapist
    place_of_worship
    plumber
    police
    post_office
    real_estate_agency
    restaurant
    roofing_contractor
    rv_park
    school
    shoe_store
    shopping_mall
    spa
    stadium
    storage
    store
    subway_station
    synagogue
    taxi_stand
    train_station
    travel_agency
    university
    veterinary_care
    zoo

Table 2: Additional types returned by the Places service

The following types may be returned in the results of a place search, in addition to the types in table 1 above.
Note: The types below are not supported in the types filter of a place search, or in the types property when adding a place.

    administrative_area_level_1
    administrative_area_level_2
    administrative_area_level_3
    colloquial_area
    country
    floor
    geocode
    intersection
    locality
    natural_feature
    neighborhood
    political
    point_of_interest
    post_box
    postal_code
    postal_code_prefix
    postal_town
    premise
    room
    route
    street_address
    street_number
    sublocality
    sublocality_level_4
    sublocality_level_5
    sublocality_level_3
    sublocality_level_2
    sublocality_level_1
    subpremise
    transit_station
