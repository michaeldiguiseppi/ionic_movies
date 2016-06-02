# MMDB v2

Mike's Movie Database v2.0 is the second iteration of my Movie Cataloguing Application. It is an application built in Ionic, powered by an [API back-end](www.github.com/michaeldiguiseppi/capstone_api) that I built also.  For data persistence, I used MongoDB and Mongoose.

### Features

#### Barcode Scanner
  - Scan barcodes on the backs of DVD cases to search and add the movie to your collection.
  - Can also search by Title if the barcode isn't found.

#### Title Search
  - An OMDBApi title search.
  - Search by the movie or show title, and then add the movie/show to either your collection or your wishlist.

#### Collection View
  - A collection of all the movies/shows owned by the user.
  - Movies/shows can be removed from the collection.
  - Through the collection, a user can find streaming sources for the movie/show.

#### Random Title
  - Users can select a random title from their collection if they don't know what they want to watch.

#### Wishlist
  - A user can add movies to their wishlist that they hope to own or want to own.
  - The wishlist is a separate list from the collection.
  - Users can then move movies from their wishlist to their collection once they own them.
