import { config } from "dotenv";
config();

import "./Handlers/Server";

/*
    Welcome to Mc's BasedServer template! (v1.1 - 30.12.2023 update)
    This is the exact same base I use for projects like Dispriv, Birdnest, GDTS and more.

    Here's a quick overview:
        - Handlers:
          Handlers are the big boys - websockets, servers, anything that has to be constantly running.
          Personally, I always import those here in index, like the Server handler.
        - Modules:
          These are smaller, util classes. A good example of that is the Logger util, which lets you
          print to the console with COLORS!
        - Routes:
          The routes folder houses scripts with a router, some endpoints and other fun stuff!

    I recommend familiarizing yourself with all the code before adding anything yourself.
*/