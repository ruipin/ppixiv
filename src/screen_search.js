"use strict";

let thumbnail_ui = class extends ppixiv.widget
{
    constructor(options)
    {
        super({
            ...options,
            template: `
            <div class=thumbnail-ui-box data-context-menu-target=off>
                <div class="data-source-specific avatar-container" data-datasource="artist illust bookmarks following"></div>
                <a href=# class="data-source-specific image-for-suggestions" data-datasource=related-illusts>
                    <!-- A blank image, so we don't load anything: -->
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==">
                </a>

                <div class=title-with-button-row>
                    <div class="displaying title-font"></div>
                    <div style="flex: 1;"></div>
                    <!-- Links at the top left when viewing a user will be inserted here. -->
                    <div class="button-row user-links">
                    </div>
                </div>

                <div class=button-row>
                    <a class="disable-ui-button popup pixiv-only" data-popup="Return to Pixiv" href="#no-ppixiv">
                        <ppixiv-inline class="icon-button grey-icon" src="resources/pixiv-icon.svg"></ppixiv-inline>
                    </a>

                    <!-- Containing block for :hover highlights on the button: -->
                    <div class=pixiv-only>
                        <div class="grey-icon icon-button popup-menu-box-button popup parent-highlight" data-popup="Search">
                            <ppixiv-inline src="resources/icon-search.svg"></ppixiv-inline>
                        </div>

                        <div hidden class="main-search-menu popup-menu-box vertical-list">
                            <div class="navigation-search-box" style="padding: .25em; margin: .25em;">
                                <div class=search-box>
                                    <span class="input-field-container" style="width: 100%;">
                                        <input class="keep-menu-open" placeholder=Search>

                                        <span class="right-side-button search-submit-button">
                                            <span class="material-icons">search</span>                                            
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="refresh-search-button grey-icon icon-button popup" data-popup="Refresh">
                        <ppixiv-inline src="resources/refresh-icon.svg"></ppixiv-inline>
                    </div>

                    <div class="whats-new-button popup" data-popup="What's New" style="margin-right: -2px;">
                        <ppixiv-inline src="resources/whats-new.svg"></ppixiv-inline>
                    </div>

                    <div class="settings-menu-box popup" data-popup="Preferences">
                        <div class="grey-icon parent-highlight icon-button preferences-button">
                            <ppixiv-inline src="resources/settings-icon.svg"></ppixiv-inline>
                        </div>
                        <div hidden class="popup-menu-box vertical-list">
                        </div>
                    </div>
                </div>

                <div class="data-source-specific box-button-row" data-datasource=discovery>
                    <a class="box-link popup" data-type=all data-popup="Show all works" href="?mode=all#ppixiv">All</a>
                    <a class="box-link popup" data-type=safe data-popup="Show all-ages works" href="?mode=safe#ppixiv">All ages</a>
                    <a class="box-link popup r18" data-type=r18 data-popup="Show R18 works" href="?mode=r18#ppixiv">R18</a>
                </div>

                <div class="data-source-specific box-button-row" data-datasource=new_illust>
                    <a class="box-link popup" data-type=new-illust-type-illust data-popup="Show illustrations" href="#">Illustrations</a>
                    <a class="box-link popup" data-type=new-illust-type-manga data-popup="Show manga only" href="#">Manga</a>

                    <a class="box-link popup" data-type=new-illust-ages-all data-popup="Show all-ages works" href="#">All ages</a>
                    <a class="box-link popup r18" data-type=new-illust-ages-r18 data-popup="Show R18 works" href="#">R18</a>
                </div>
                
                <div class="data-source-specific" data-datasource=rankings>
                    <div class=box-button-row>
                        <a class="nav-tomorrow box-link popup" data-popup="Show the next day" href="#"><span>Next day</span></a>
                        <span class=nav-today style="margin: 0 0.25em;"></span>
                        <a class="nav-yesterday box-link popup" data-popup="Show the previous day" href="#"><span>Previous day</span></a>
                    </div>

                    <div class="checked-links box-button-row">
                        <a class="box-link popup" data-type=content-all data-popup="Show all works" href="#">All</a>
                        <a class="box-link popup" data-type=content-illust data-popup="Show illustrations only" href="#">Illustrations</a>
                        <a class="box-link popup" data-type=content-ugoira data-popup="Show ugoira only" href="#">Ugoira</a>
                        <a class="box-link popup" data-type=content-manga data-popup="Show manga only" href="#">Manga</a>
                    </div>

                    <div class="checked-links box-button-row">
                        <a class="box-link popup" data-type=mode-daily data-popup="Daily rankings" href="#">Daily</a>
                        <a class="box-link popup r18" data-type=mode-daily-r18 data-popup="Show R18 works (daily only)" href="#">R18</a>
                        <a class="box-link popup r18g" data-type=mode-r18g data-popup="Show R18G works (weekly only)" href="#">R18G</a>
                        <a class="box-link popup" data-type=mode-weekly data-popup="Weekly rankings" href="#">Weekly</a>
                        <a class="box-link popup" data-type=mode-monthly data-popup="Monthly rankings" href="#">Monthly</a>
                        <a class="box-link popup" data-type=mode-rookie data-popup="Rookie rankings" href="#">Rookie</a>
                        <a class="box-link popup" data-type=mode-original data-popup="Original rankings" href="#">Original</a>
                        <a class="box-link popup" data-type=mode-male data-popup="Popular with men" href="#">Male</a>
                        <a class="box-link popup" data-type=mode-female data-popup="Popular with women" href="#">Female</a>
                    </div>
                </div>
                 
                <div class="data-source-specific box-button-row" data-datasource=recent>
                    <a class="box-link popup" data-type=clear-recents data-popup="Clear recent history" href=#>Clear</a>
                </div>
                
                <div class="data-source-specific" data-datasource=bookmarks>
                    <div class=box-button-row>
                        <!-- These are hidden if you're viewing somebody else's bookmarks. -->
                        <span class=bookmarks-public-private style="margin-right: 25px;">
                            <a class="box-link popup" data-type=all data-popup="Show all bookmarks" href=#>All</a>
                            <a class="box-link popup" data-type=public data-popup="Show public bookmarks" href=#>Public</a>
                            <a class="box-link popup" data-type=private data-popup="Show private bookmarks" href=#>Private</a>
                        </span>

                        <span class=bookmarks-shuffle>
                            <a class="box-link popup" data-type=order-date data-popup="Show newest bookmarks first" href=#>Newest</a>
                            <a class="box-link popup" data-type=order-shuffle data-popup="Show in random order" href=#>Shuffle</a>
                        </span>

                        <a class="box-link autoplay popup" data-popup="Autoplay" href="#">
                            <span class="material-icons">wallpaper</span>
                        </a>
                    </div>
                </div>                

                <div class="data-source-specific" data-datasource=following>
                    <div class="follows-public-private box-button-row">
                        <a class="box-link popup" data-type=public-follows data-popup="Show publically followed users" href=#>Public</a>
                        <a class="box-link popup" data-type=private-follows data-popup="Show privately followed users" href=#>Private</a>
                    </div>

                    <div class="follow-tag-list box-button-row">
                        <span>Follow tags:</span>
                    </div>
                </div>                
                
                <div class="data-source-specific" data-datasource="bookmarks">
                    <div class="box-button-row bookmark-tag-list">
                        <span>Bookmark tags:</span>
                    </div>
                </div>

                <div class=data-source-specific data-datasource="bookmarks_new_illust">
                    <div class=box-button-row>
                        <a class="box-link popup" data-type=bookmarks-new-illust-all data-popup="Show all works" href="#">All</a>
                        <a class="box-link popup r18" data-type=bookmarks-new-illust-ages-r18 data-popup="Show R18 works" href="#">R18</a>
                    </div>

                    <div class=box-button-row>
                        <div class="follow-new-post-tag-list box-button-row">
                            <span>Follow tags:</span>
                        </div>
                    </div>
                </div>

                <div class="data-source-specific" data-datasource=artist>
                    <div class="box-button-row search-options-row">
                        <a class="box-link popup" data-type=artist-works data-popup="Show all works" href=#>Works</a>
                        <a class="box-link popup" data-type=artist-illust data-popup="Show illustrations only" href=#>Illusts</a>
                        <a class="box-link popup" data-type=artist-manga data-popup="Show manga only" href=#>Manga</a>

                        <div class=member-tags-box>
                            <div class="box-link popup-menu-box-button">Tags</div>
                            <div class="popup-menu-box post-tag-list vertical-list"></div>
                        </div>
                    </div>
                </div>
                 
                <div class="data-source-specific" data-datasource=search>
                    <div>
                        <div class="search-box tag-search-box">
                            <div class="input-field-container hover-menu-box">
                                <input placeholder=Tags>
                                <span class="edit-search-button right-side-button">
                                    <ppixiv-inline src="resources/edit-icon.svg"></ppixiv-inline>
                                </span>

                                <span class="search-submit-button right-side-button">
                                    <span class="material-icons">search</span>                                            
                                </span>
                            </div>

                            <div class="search-tags-box box-button-row" style="display: inline-block;">
                                <div class="box-link popup-menu-box-button">Related tags</div>
                                <div class="popup-menu-box related-tag-list vertical-list"></div>
                            </div>
                        </div>
                    </div>

                    <!-- We don't currently have popup text for these, since it's a little annoying to
                         have it pop over the menu. -->
                    <div class="box-button-row search-options-row">
                        <span class="box-link popup-menu-box-button">Ages</span>
                        <div hidden class="popup-menu-box vertical-list">
                            <a class=box-link data-type=ages-all data-default=1 href="?mode=all#ppixiv">All</a>
                            <a class=box-link data-type=ages-safe href="?mode=safe#ppixiv">All ages</a>
                            <a class="box-link r18" data-type=ages-r18 href="?mode=r18#ppixiv">R18</a>
                        </div>

                        <span class="box-link popup-menu-box-button">Sort</span>
                        <div hidden class="popup-menu-box vertical-list">
                            <a class=box-link data-type=order-newest data-default=1 href="?order=all#ppixiv">Newest</a>
                            <a class=box-link data-type=order-oldest href="?order=all#ppixiv">Oldest</a>
                            <a class="box-link premium-only" data-type=order-all href="?order=popular_d#ppixiv">Popularity</a>
                            <a class="box-link premium-only" data-type=order-male href="?order=popular_male_d#ppixiv" data-short-label="Popular ♂">Popular with men</a>
                            <a class="box-link premium-only" data-type=order-female href="?order=popular_female_d#ppixiv" data-short-label="Popular ♀">Popular with women</a>
                        </div>

                        <span class="box-link popup-menu-box-button">Type</span>
                        <div hidden class="popup-menu-box vertical-list">
                            <a class=box-link data-type=search-type-all data-default=1 href="?type=all#ppixiv">All</a>
                            <a class=box-link data-type=search-type-illust data-short-label="Illusts" href="?type=illust#ppixiv">Illustrations</a>
                            <a class=box-link data-type=search-type-manga href="?type=manga#ppixiv">Manga</a>
                            <a class=box-link data-type=search-type-ugoira href="?type=ugoira#ppixiv">Ugoira</a>
                        </div>

                        <span class="box-link popup-menu-box-button">Search mode</span>
                        <div hidden class="popup-menu-box vertical-list">
                            <a class=box-link data-type=search-all data-default=1 href="?#ppixiv">Tag</a>
                            <a class=box-link data-type=search-exact data-short-label="Exact match" href="?s_mode=s_tag_full#ppixiv">Exact tag match</a>
                            <a class=box-link data-type=search-text href="?s_mode=s_tc#ppixiv">Text search</a>
                        </div>

                        <span class="box-link popup-menu-box-button">Image size</span>
                        <div hidden class="popup-menu-box vertical-list">
                            <a class=box-link data-type=res-all data-default=1 href="#">All</a>
                            <a class=box-link data-type=res-high href="?wlt=3000&hlt=3000#ppixiv">High-res</a>
                            <a class=box-link data-type=res-medium href="?wlt=1000&wgt=2999&hlt=1000&hgt=2999#ppixiv">Medium-res</a>
                            <a class=box-link data-type=res-low href="?wgt=999&hgt=999#ppixiv">Low-res</a>
                        </div>
                        
                        <span class="box-link popup-menu-box-button">Aspect ratio</span>
                        <div hidden class="popup-menu-box vertical-list">
                            <a class=box-link data-type=aspect-ratio-all data-default=1 href="?ratio=0.5#ppixiv">All</a>
                            <a class=box-link data-type=aspect-ratio-landscape href="?ratio=0.5#ppixiv">Landscape</a>
                            <a class=box-link data-type=aspect-ratio-portrait href="?ratio=-0.5#ppixiv">Portrait</a>
                            <a class=box-link data-type=aspect-ratio-square href="?ratio=0#ppixiv">Square</a>
                        </div>

                        <span class="box-link popup-menu-box-button premium-only">Bookmarks</span>
                        <div hidden class="popup-menu-box vertical-list">
                            <!-- The Pixiv search form shows 300-499, 500-999 and 1000-.  That's not
                                 really useful and the query parameters let us filter differently, so we
                                 replace it with a more useful "minimum bookmarks" filter. -->
                            <a class=box-link data-type=bookmarks-all data-default=1 href="#ppixiv">All</a>
                            <a class=box-link data-type=bookmarks-100 href=#>100+</a>
                            <a class=box-link data-type=bookmarks-250 href=#>250+</a>
                            <a class=box-link data-type=bookmarks-500 href=#>500+</a>
                            <a class=box-link data-type=bookmarks-1000 href=#>1000+</a>
                            <a class=box-link data-type=bookmarks-2500 href=#>2500+</a>
                            <a class=box-link data-type=bookmarks-5000 href=#>5000+</a>
                        </div>
                       
                        <span class="box-link popup-menu-box-button premium-only">Time</span>
                        <div hidden class="popup-menu-box vertical-list">
                            <a class=box-link data-type=time-all data-default=1 href="#">All</a>
                            <a class=box-link data-type=time-week data-short-label="Weekly" href="#">This week</a>
                            <a class=box-link data-type=time-month data-short-label="Monthly" href="#">This month</a>
                            <a class=box-link data-type=time-year data-short-label="Yearly" href="#">This year</a>
                            <div class=years-ago>
                                <a class=box-link data-type=time-years-ago-1 data-short-label="1 year" href="#">1</a>
                                <a class=box-link data-type=time-years-ago-2 data-short-label="2 years" href="#">2</a>
                                <a class=box-link data-type=time-years-ago-3 data-short-label="3 years" href="#">3</a>
                                <a class=box-link data-type=time-years-ago-4 data-short-label="4 years" href="#">4</a>
                                <a class=box-link data-type=time-years-ago-5 data-short-label="5 years" href="#">5</a>
                                <a class=box-link data-type=time-years-ago-6 data-short-label="6 years" href="#">6</a>
                                <a class=box-link data-type=time-years-ago-7 data-short-label="7 years" href="#">7</a>
                                <span>years ago</span>
                            </div>
                        </div>
                        
                        <a href=# class="reset-search box-link popup" data-popup="Clear all search options">Reset</a>
                    </div>
                </div>

                <div class="search-box data-source-specific" data-datasource=search-users>
                    <div class="user-search-box input-field-container hover-menu-box">
                        <input class=search-users placeholder="Search users">
                        <span class="search-submit-button right-side-button">
                            <span class="material-icons">search</span>                                            
                        </span>
                    </div>
                </div>

                <div class="data-source-specific" data-datasource=vview>
                    <div class="search-box local-tag-search-box">
                        <div class="input-field-container hover-menu-box">
                            <input placeholder="Search files">

                            <span class="clear-local-search-button right-side-button">
                                <span class="material-icons" style="display: block; color: black;">clear</span>                                
                            </span>

                            <span class="submit-local-search-button right-side-button">
                                <span class="material-icons" style="display: block; color: black;">search</span>                                
                            </span>
                        </div>
                    </div>

                    <div class="box-button-row">
                        <span class="popup grey-icon copy-local-path" data-popup="Copy local path to clipboard" style="cursor: pointer;">
                            <span class="material-icons">content_copy</span>
                        </span>

                        <a class="box-link popup" data-type=local-bookmarks-only data-popup="Show bookmarks" href="#">Bookmarks</a>

                        <span class="box-link popup-menu-box-button">Type</span>
                        <div hidden class="popup-menu-box vertical-list">
                            <a class=box-link data-type=local-type-all data-default=1 href="#ppixiv">All</a>
                            <a class=box-link data-type=local-type-videos href="#ppixiv">Videos</a>
                            <a class=box-link data-type=local-type-images href="#ppixiv">Images</a>
                        </div>
                        
                        <span class="box-link popup-menu-box-button">Aspect ratio</span>
                        <div hidden class="popup-menu-box vertical-list">
                            <a class=box-link data-type=local-aspect-ratio-all data-default=1>All</a>
                            <a class=box-link data-type=local-aspect-ratio-landscape>Landscape</a>
                            <a class=box-link data-type=local-aspect-ratio-portrait>Portrait</a>
                        </div>
                        
                        <span class="box-link popup-menu-box-button">Image size</span>
                        <div hidden class="popup-menu-box vertical-list">
                            <a class=box-link data-type=local-res-all data-default=1 href="#">All</a>
                            <a class=box-link data-type=local-res-high href="?wlt=3000&hlt=3000#ppixiv">High-res</a>
                            <a class=box-link data-type=local-res-medium href="?wlt=1000&wgt=2999&hlt=1000&hgt=2999#ppixiv">Medium-res</a>
                            <a class=box-link data-type=local-res-low href="?wgt=999&hgt=999#ppixiv">Low-res</a>
                        </div>

                        <span class="box-link popup-menu-box-button">Order</span>
                        <div hidden class="popup-menu-box vertical-list">
                            <a class=box-link data-type=local-sort-normal data-default=1 href="#">Name</a>
                            <a class=box-link data-type=local-sort-invert href="#">Name (inverse)</a>
                            <a class=box-link data-type=local-sort-newest href="#">Newest</a>
                            <a class=box-link data-type=local-sort-oldest href="#">Oldest</a>
                        </div>

                        <a class="box-link local-shuffle popup" data-popup="Shuffle" href="#" data-type=local-sort-shuffle>
                            <span class="material-icons">shuffle</span>
                        </a>

                        <a class="box-link local-autoplay autoplay popup" data-popup="Autoplay" href="#">
                            <span class="material-icons">wallpaper</span>
                        </a>
                    </div>
                    <div class="box-button-row local-bookmark-tag-list">
                        <span>Bookmark tags:</span>
                    </div>
                </div>                
            </div>
            `
        });
    }
}

// The search UI.
ppixiv.screen_search = class extends ppixiv.screen
{
    constructor(options)
    {
        super(options);
        
        this.thumbs_loaded = this.thumbs_loaded.bind(this);
        this.data_source_updated = this.data_source_updated.bind(this);
        this.onwheel = this.onwheel.bind(this);
//        this.onmousemove = this.onmousemove.bind(this);
        this.refresh_thumbnail = this.refresh_thumbnail.bind(this);
        this.refresh_images = this.refresh_images.bind(this);
        this.update_from_settings = this.update_from_settings.bind(this);
        this.thumbnail_onclick = this.thumbnail_onclick.bind(this);
        this.submit_user_search = this.submit_user_search.bind(this);

        this.scroll_container = this.container.querySelector(".search-results");

        window.addEventListener("thumbnailsLoaded", this.thumbs_loaded);
        window.addEventListener("focus", this.visible_thumbs_changed);

        this.container.addEventListener("wheel", this.onwheel, { passive: false });
//        this.container.addEventListener("mousemove", this.onmousemove);

        image_data.singleton().user_modified_callbacks.register(this.refresh_ui.bind(this));

        // When a bookmark is modified, refresh the heart icon.
        image_data.singleton().illust_modified_callbacks.register(this.refresh_thumbnail);

        new thumbnail_ui({
            parent: this,
            container: this.container.querySelector(".thumbnail-ui-box-container"),
        });

        this.create_main_search_menu();

        this.thumbnail_dimensions_style = helpers.create_style("");
        document.body.appendChild(this.thumbnail_dimensions_style);
        
        // Create the avatar widget shown on the artist data source.
        this.avatar_container = this.container.querySelector(".avatar-container");
        this.avatar_widget = new avatar_widget({
            container: this.avatar_container,
            changed_callback: this.data_source_updated,
            big: true,
            mode: "dropdown",
        });
        
        // Create the tag widget used by the search data source.
        this.tag_widget = new tag_widget({
            contents: this.container.querySelector(".related-tag-list"),
        });

        // Don't scroll thumbnails when scrolling tag dropdowns.
        // FIXME: This works on member-tags-box, but not reliably on search-tags-box, even though
        // they seem like the same thing.
        this.container.querySelector(".member-tags-box .post-tag-list").addEventListener("scroll", function(e) { e.stopPropagation(); }, true);
        this.container.querySelector(".search-tags-box .related-tag-list").addEventListener("scroll", function(e) { e.stopPropagation(); }, true);

        // Set up hover popups.
        dropdown_menu_opener.create_handlers(this.container);

        // As an optimization, start loading image info on mousedown.  We don't navigate until click,
        // but this lets us start loading image info a bit earlier.
        this.container.querySelector(".thumbnails").addEventListener("mousedown", async (e) => {
            if(e.button != 0)
                return;

            // Don't do this when viewing followed users, since we'll be loading the user rather than the post.
            if(this.data_source && this.data_source.search_mode == "users")
                return;

            var a = e.target.closest("a.thumbnail-link");
            if(a == null)
                return;

            if(a.dataset.illustId == null)
                return;

            await image_data.singleton().get_image_info(a.dataset.illustId);
        }, true);
 
        this.container.querySelector(".refresh-search-button").addEventListener("click", this.refresh_search.bind(this));
        this.container.querySelector(".whats-new-button").addEventListener("click", this.whats_new.bind(this));
        this.container.querySelector(".thumbnails").addEventListener("click", this.thumbnail_onclick);

        // Handle quick view.
        new ppixiv.pointer_listener({
            element: this.container.querySelector(".thumbnails"),
            button_mask: 0b1,
            callback: (e) => {
                if(!e.pressed)
                    return;

                let a = e.target.closest("A");
                if(a == null)
                    return;

                if(!settings.get("quick_view"))
                    return;

                // Activating on press would probably break navigation on touchpads, so only do
                // this for mouse events.
                if(e.pointerType != "mouse")
                    return;

                let { illust_id, page } = main_controller.singleton.get_illust_at_element(e.target);
                if(illust_id == null)
                    return;

                // Don't stopPropagation.  We want the illustration view to see the press too.
                e.preventDefault();
                // e.stopImmediatePropagation();
        
                main_controller.singleton.show_illust(illust_id, {
                    page: page,
                    add_to_history: true,
                });
            },
        });
        // Clear recent illusts:
        this.container.querySelector("[data-type='clear-recents']").addEventListener("click", async (e) => {
            e.preventDefault();
            e.stopPropagation();

            await ppixiv.recently_seen_illusts.get().clear();
            this.refresh_search();
        });

        this.container.querySelector(".preferences-button").addEventListener("click", (e) => {
            new ppixiv.settings_dialog({ container: document.body });
        });

        settings.register_change_callback("thumbnail-size", () => {
            // refresh_images first to update thumbnail_dimensions_style.
            this.refresh_images();
        });

        settings.register_change_callback("theme", this.update_from_settings);
        settings.register_change_callback("disable_thumbnail_zooming", this.update_from_settings);
        settings.register_change_callback("disable_thumbnail_panning", this.update_from_settings);
        settings.register_change_callback("ui-on-hover", this.update_from_settings);
        settings.register_change_callback("no-hide-cursor", this.update_from_settings);
        settings.register_change_callback("no_recent_history", this.update_from_settings);

        // Zoom the thumbnails on ctrl-mousewheel:
        this.container.addEventListener("wheel", (e) => {
            if(!e.ctrlKey)
                return;
    
            e.preventDefault();
            e.stopImmediatePropagation();
    
            settings.adjust_zoom("thumbnail-size", e.deltaY > 0);
        }, { passive: false });
            
        this.container.addEventListener("keydown", (e) => {
            let zoom = helpers.is_zoom_hotkey(e);
            if(zoom != null)
            {
                e.preventDefault();
                e.stopImmediatePropagation();
                settings.adjust_zoom("thumbnail-size", zoom < 0);
            }
        });

        // Create the tag dropdown for the search page input.
        new tag_search_box_widget({ contents: this.container.querySelector(".tag-search-box") });
            
        // Create the tag dropdown for the search input in the menu dropdown.
        new tag_search_box_widget({ contents: this.container.querySelector(".navigation-search-box") });

        // The search history dropdown for local searches.
        new local_search_box_widget({ contents: this.container.querySelector(".local-tag-search-box") });
        
        new close_search_widget({
            parent: this,
            container: this.container.querySelector(".local-navigation-box"),
        });
        this.local_nav_widget = new ppixiv.local_navigation_widget({
            parent: this,
            container: this.container.querySelector(".local-navigation-box"),
        });
    
        this.container.querySelector(".copy-local-path").addEventListener("click", (e) => {
            this.data_source.copy_link();
        });

        // Handle submitting searches on the user search page.
        this.container.querySelector(".user-search-box .search-submit-button").addEventListener("click", this.submit_user_search);
        helpers.input_handler(this.container.querySelector(".user-search-box input.search-users"), this.submit_user_search);

        // Create IntersectionObservers for thumbs that are completely onscreen, nearly onscreen (should
        // be preloaded), and farther off (but not so far they should be unloaded).
        this.intersection_observers = [];
        this.intersection_observers.push(new IntersectionObserver((entries) => {
            for(let entry of entries)
                helpers.set_dataset(entry.target.dataset, "fullyOnScreen", entry.isIntersecting);

            this.load_needed_thumb_data();
            this.first_visible_thumbs_changed();
        }, {
            root: this.scroll_container,
            threshold: 1,
        }));
        
        this.intersection_observers.push(new IntersectionObserver((entries) => {
            for(let entry of entries)
                helpers.set_dataset(entry.target.dataset, "nearby", entry.isIntersecting);

            // Set up any thumbs that just came nearby, and see if we need to load more search results.
            this.set_visible_thumbs();
            this.load_needed_thumb_data();
        }, {
            root: this.scroll_container,

            // This margin determines how far in advance we load the next page of results.
            rootMargin: "50%",
        }));

        this.intersection_observers.push(new IntersectionObserver((entries) => {
            for(let entry of entries)
                helpers.set_dataset(entry.target.dataset, "visible", entry.isIntersecting);
            
            this.visible_thumbs_changed();
        }, {
            root: this.scroll_container,
            rootMargin: "0%",
        }));
        
        /*
         * Add a slight delay before hiding the UI.  This allows opening the UI by swiping past the top
         * of the window, without it disappearing as soon as the mouse leaves the window.  This doesn't
         * affect opening the UI.
         *
         * We're actually handling the manga UI's top-ui-box here too.
         */
        for(let box of document.querySelectorAll(".top-ui-box"))
            new hover_with_delay(box, 0, 0.25);
        
        this.update_from_settings();
        this.refresh_images();
        this.load_needed_thumb_data();
        this.refresh_whats_new_button();
    }

    create_main_search_menu()
    {
        let option_box = this.container.querySelector(".main-search-menu");
        this.menu_options = [];
        let options = [
            { label: "New works", url: "/new_illust.php#ppixiv" },
            { label: "New works by following", url: "/bookmark_new_illust.php#ppixiv" },
            [
                { label: "Bookmarks", url: `/users/${window.global_data.user_id}/bookmarks/artworks#ppixiv` },
                { label: "all", url: `/users/${window.global_data.user_id}/bookmarks/artworks#ppixiv` },
                { label: "public", url: `/users/${window.global_data.user_id}/bookmarks/artworks#ppixiv?show-all=0` },
                { label: "private", url: `/users/${window.global_data.user_id}/bookmarks/artworks?rest=hide#ppixiv?show-all=0` },
            ],
            [
                { label: "Followed users", url: `/users/${window.global_data.user_id}/following#ppixiv` },
                { label: "public", url: `/users/${window.global_data.user_id}/following#ppixiv` },
                { label: "private", url: `/users/${window.global_data.user_id}/following?rest=hide#ppixiv` },
            ],

            { label: "Recommended works", url: "/discovery#ppixiv" },
            { label: "Recommended users", url: "/discovery/users#ppixiv" },
            { label: "Search users", url: "/search_user.php#ppixiv" },
            { label: "Rankings", url: "/ranking.php#ppixiv" },
            { label: "Recent history", url: "/history.php#ppixiv", classes: ["recent-history-link"] },
            { label: "Local search", url: `${local_api.path}#ppixiv/`, local: true, onclick: local_api.show_local_search },
        ];


        let create_option = (option) => {
            let button = new menu_option_button({
                container: option_box,
                parent: this,
                no_icon_padding: true,
                label: option.label,
                url: option.url,
                classes: option.classes,
                onclick: option.onclick,
            })

            // Hide the local search menu option if it's not enabled.
            if(option.local && !local_api.is_enabled())
                button.container.hidden = true;
            return button;
        };

        for(let option of options)
        {
            if(Array.isArray(option))
            {
                let items = [];
                for(let suboption of option)
                    items.push(create_option(suboption));

                new menu_option_row({
                    container: option_box,
                    parent: this,
                    items: items,
                });
            }
            else
                this.menu_options.push(create_option(option));
        }

        // Move the tag search box back to the bottom.
        let search = option_box.querySelector(".navigation-search-box");
        search.remove();
        option_box.insertAdjacentElement("beforeend", search);
    }

    // This is called as the user scrolls and different thumbs are fully onscreen,
    // to update the page URL.
    first_visible_thumbs_changed()
    {
        // Find the first thumb that's fully onscreen.  Ignore elements not specific to a page (load previous results).
        let first_thumb = this.container.querySelector(`.thumbnails > [data-id][data-fully-on-screen][data-page]`);
        if(!first_thumb)
            return;

        // If the data source supports a start page, update the page number in the URL to reflect
        // the first visible thumb.
        if(this.data_source == null || !this.data_source.supports_start_page || first_thumb.dataset.page == null)
            return;

        main_controller.singleton.temporarily_ignore_onpopstate = true;
        try {
            let args = helpers.args.location;
            this.data_source.set_start_page(args, first_thumb.dataset.page);
            helpers.set_page_url(args, false, "viewing-page");
        } finally {
            main_controller.singleton.temporarily_ignore_onpopstate = false;
        }
    }

    // The thumbs actually visible onscreen have changed, or the window has gained focus.
    // Store recently viewed thumbs.
    visible_thumbs_changed = () =>
    {
        // Don't add recent illusts if we're viewing recent illusts.
        if(this.data_source && this.data_source.name == "recent")
            return;

        let visible_illust_ids = [];
        for(let element of this.container.querySelectorAll(`.thumbnails > [data-id][data-visible]:not([data-special])`))
        {
            let { type, id } = helpers.parse_id(element.dataset.id);
            if(type != "illust")
                continue;

            visible_illust_ids.push(id);
        }
        
        ppixiv.recently_seen_illusts.get().add_illusts(visible_illust_ids);
    }

    refresh_search()
    {
        main_controller.singleton.refresh_current_data_source();
    }
        
    // Set or clear the updates class on the "what's new" button.
    refresh_whats_new_button()
    {
        let last_viewed_version = settings.get("whats-new-last-viewed-version", 0);

        // This was stored as a string before, since it came from GM_info.script.version.  Make
        // sure it's an integer.
        last_viewed_version = parseInt(last_viewed_version);

        let new_updates = last_viewed_version < whats_new.latest_interesting_history_revision();
        helpers.set_class(this.container.querySelector(".whats-new-button"), "updates", new_updates);
    }

    whats_new()
    {
        settings.set("whats-new-last-viewed-version", whats_new.latest_history_revision());
        this.refresh_whats_new_button();

        new whats_new({ container: document.body });
    }

    /* This scrolls the thumbnail when you hover over it.  It's sort of neat, but it's pretty
     * choppy, and doesn't transition smoothly when the mouse first hovers over the thumbnail,
     * causing it to pop to a new location. 
    onmousemove(e)
    {
        var thumb = e.target.closest(".thumbnail-box a");
        if(thumb == null)
            return;

        var bounds = thumb.getBoundingClientRect();
        var x = e.clientX - bounds.left;
        var y = e.clientY - bounds.top;
        x = 100 * x / thumb.offsetWidth;
        y = 100 * y / thumb.offsetHeight;

        var img = thumb.querySelector("img.thumb");
        img.style.objectPosition = x + "% " + y + "%";
    }
*/
    onwheel(e)
    {
        // Stop event propagation so we don't change images on any viewer underneath the thumbs.
        e.stopPropagation();
    };

    initial_refresh_ui()
    {
        if(this.data_source != null)
        {
            var ui_box = this.container.querySelector(".thumbnail-ui-box");
            this.data_source.initial_refresh_thumbnail_ui(ui_box, this);
        }
    }

    set_data_source(data_source)
    {
        if(this.data_source == data_source)
            return;

        // Remove listeners from the old data source.
        if(this.data_source != null)
            this.data_source.remove_update_listener(this.data_source_updated);

        // If the search mode is changing (eg. we're going from a list of illustrations to a list
        // of users), remove thumbs so we recreate them.  Otherwise, refresh_images will reuse them
        // and they can be left on the wrong display type.
        var old_search_mode = this.data_source? this.data_source.search_mode:"";
        var new_search_mode = data_source? data_source.search_mode:"";
        if(old_search_mode != new_search_mode)
        {
            var ul = this.container.querySelector(".thumbnails");
            while(ul.firstElementChild != null)
            {
                let node = ul.firstElementChild;
                node.remove();

                // We should be able to just remove the element and get a callback that it's no longer visible.
                // This works in Chrome since IntersectionObserver uses a weak ref, but Firefox is stupid and leaks
                // the node.
                for(let observer of this.intersection_observers)
                    observer.unobserve(node);
            }
        }

        this.data_source = data_source;

        if(this.data_source == null)
            return;
        
        // If we disabled loading more pages earlier, reenable it.
        this.disable_loading_more_pages = false;

        // Disable the avatar widget unless the data source enables it.
        this.avatar_container.hidden = true;

        // Listen to the data source loading new pages, so we can refresh the list.
        this.data_source.add_update_listener(this.data_source_updated);

        this.load_needed_thumb_data();
    };

    restore_scroll_position()
    {
        // If we saved a scroll position when navigating away from a data source earlier,
        // restore it now.  Only do this once.
        if(this.data_source.thumbnail_view_scroll_pos != null)
        {
            this.scroll_container.scrollTop = this.data_source.thumbnail_view_scroll_pos;
            delete this.data_source.thumbnail_view_scroll_pos;
        }
        else
            this.scroll_to_top();
    }

    scroll_to_top()
    {
        this.scroll_container.scrollTop = 0;
    }

    refresh_ui()
    {
        if(!this.active)
            return;

        var element_displaying = this.container.querySelector(".displaying");
        element_displaying.hidden = this.data_source.get_displaying_text == null;
        if(this.data_source.get_displaying_text != null)
        {
            // get_displaying_text can either be a string or an element.
            let text = this.data_source.get_displaying_text();
            helpers.remove_elements(element_displaying);
            if(typeof text == "string")
                element_displaying.innerText = text;
            else if(text instanceof HTMLElement)
            {
                helpers.remove_elements(element_displaying);
                element_displaying.appendChild(text);
            }
        }

        this.data_source.set_page_icon();
        helpers.set_page_title(this.data_source.page_title || "Loading...");
        
        var ui_box = this.container.querySelector(".thumbnail-ui-box");
        this.data_source.refresh_thumbnail_ui(ui_box, this);

        this.refresh_autoplay_button();
        this.refresh_ui_for_user_id();
    };

    // Return the user ID we're viewing, or null if we're not viewing anything specific to a user.
    get viewing_user_id()
    {
        if(this.data_source == null)
            return null;
        return this.data_source.viewing_user_id;
    }

    // If the data source has an associated artist, return the "user:ID" for the user, so
    // when we navigate back to an earlier search, pulse_thumbnail will know which user to
    // flash.
    get displayed_illust_id()
    {
        if(this.data_source == null)
            return super.displayed_illust_id;

        let user_id = this.data_source.viewing_user_id;
        if(user_id != null)
            return "user:" + user_id;

        let folder_id = this.data_source.viewing_folder;
        if(folder_id != null)
            return folder_id;
    
        return super.displayed_illust_id;
    }

    // Call refresh_ui_for_user_info with the user_info for the user we're viewing,
    // if the user ID has changed.
    async refresh_ui_for_user_id()
    {
        // If we're viewing ourself (our own bookmarks page), hide the user-related UI.
        var initial_user_id = this.viewing_user_id;
        var user_id = initial_user_id == window.global_data.user_id? null:initial_user_id;

        var user_info = await image_data.singleton().get_user_info_full(user_id);

        // Stop if the user ID changed since we started this request, or if we're no longer active.
        if(this.viewing_user_id != initial_user_id || !this.active)
            return;

        // Make a list of links to add to the top corner.
        //
        // If we reach our limit for the icons we can fit, we'll cut off at the end, so put
        // higher-priority links earlier.
        let extra_links = [];

        if(user_info != null)
        {
            extra_links.push({
                url: new URL(`/messages.php?receiver_id=${user_info.userId}`, ppixiv.location),
                type: ".contact-link",
                label: "Send a message",
            });
            
            extra_links.push({
                url: new URL(`/users/${user_info.userId}/following#ppixiv`, ppixiv.location),
                type: ".following-link",
                label: `View ${user_info.name}'s followed users`,
            });

            extra_links.push({
                url: new URL(`/users/${user_info.userId}/bookmarks/artworks#ppixiv`, ppixiv.location),
                type: ".bookmarks-link",
                label: user_info? `View ${user_info.name}'s bookmarks`:`View bookmarks`,
            });

            extra_links.push({
                url: new URL(`/discovery/users#ppixiv?user_id=${user_info.userId}#ppixiv`, ppixiv.location),
                type: ".similar-artists",
                label: "Similar artists",
            });
        }

        // Set the pawoo link.
        let pawoo_url = user_info?.social?.pawoo?.url;
        if(pawoo_url != null)
        {
            extra_links.push({
                url: pawoo_url,
                type: ".pawoo-icon",
                label: "Pawoo",
            });
        }

        // Add the twitter link if there's one in the profile.
        let twitter_url = user_info?.social?.twitter?.url;
        if(twitter_url != null)
        {
            extra_links.push({
                url: twitter_url,
                type: ".twitter-icon",
            });
        }

        // Set the circle.ms link.
        let circlems_url = user_info?.social?.circlems?.url;
        if(circlems_url != null)
        {
            extra_links.push({
                url: circlems_url,
                type: ".circlems-icon",
                label: "Circle.ms",
            });
        }

        // Set the webpage link.
        //
        // If the webpage link is on a known site, disable the webpage link and add this to the
        // generic links list, so it'll use the specialized icon.
        let webpage_url = user_info?.webpage;
        if(webpage_url != null)
        {
            let type = this.find_link_image_type(webpage_url);
            extra_links.push({
                url: webpage_url,
                type: type || ".webpage-link",
                label: "Webpage",
            });
        }

        // Find any other links in the user's profile text.
        if(user_info != null)
        {
            let div = document.createElement("div");
            div.innerHTML = user_info.commentHtml;

            let limit = 4;
            for(let link of div.querySelectorAll("a"))
            {
                extra_links.push({url: helpers.fix_pixiv_link(link.href)});

                // Limit these in case people have a ton of links in their profile.
                limit--;
                if(limit == 0)
                    break;
            }
        }

        // Let the data source add more links.  For Fanbox links this is usually delayed
        // since it requires an extra API call, so put this at the end to prevent the other
        // buttons from shifting around.
        if(this.data_source != null)
            this.data_source.add_extra_links(extra_links);

        // Remove any extra buttons that we added earlier.
        let row = this.container.querySelector(".button-row.user-links");
        for(let div of row.querySelectorAll(".extra-profile-link-button"))
            div.remove();
        
        let seen_links = {};
        for(let {url, label, type} of extra_links)
        {
            // Don't add the same link twice if it's in more than one place.
            if(seen_links[url])
                continue;
            seen_links[url] = true;

            try {
                url = new URL(url);
            } catch(e) {
                console.log("Couldn't parse profile URL:", url);
                continue;
            }

            // Guess the link type if one wasn't supplied.
            if(type == null)
                type = this.find_link_image_type(url);

            let entry = this.create_template({name: "extra-link", html: `
                <div class=extra-profile-link-button>
                    <a href=# class="extra-link grey-icon bulb-button popup popup-bottom" rel="noreferer noopener">
                        <span class="default-icon">
                            <ppixiv-inline src="resources/link-icon.svg"></ppixiv-inline>
                        </span>
                        <span class="shopping-cart" hidden>
                            <ppixiv-inline src="resources/shopping-cart.svg"></ppixiv-inline>
                        </span>
                        <span class="twitter-icon" hidden>
                            <ppixiv-inline src="resources/icon-twitter.svg"></ppixiv-inline>
                        </span>
                        <span class="webpage-link" hidden>
                            <ppixiv-inline src="resources/icon-webpage.svg"></ppixiv-inline>
                        </span>
                        <span class="webpage-link" hidden>
                            <ppixiv-inline src="resources/icon-webpage.svg"></ppixiv-inline>
                        </span>
                        <span class="pawoo-icon" hidden>
                            <ppixiv-inline src="resources/icon-pawoo.svg"></ppixiv-inline>
                        </span>
                        <span class="circlems-icon" hidden>
                            <ppixiv-inline src="resources/icon-circlems.svg"></ppixiv-inline>
                        </span>
                        <span class="contact-link" hidden>
                            <ppixiv-inline src="resources/send-message.svg"></ppixiv-inline>
                        </span>
                        <span class="following-link" hidden>
                            <ppixiv-inline src="resources/followed-users-eye.svg"></ppixiv-inline>
                        </span>
                        <span class="bookmarks-link" hidden>
                            <ppixiv-inline src="resources/icon-bookmarks.svg"></ppixiv-inline>
                        </span>
                        <span class="similar-artists" hidden>
                            <ppixiv-inline src="resources/related-illusts.svg"></ppixiv-inline>
                        </span>
                       
                    </a>
                </div>
            `});
            
            let a = entry.querySelector(".extra-link");
            a.href = url;

            // If this is a Twitter link, parse out the ID.  We do this here so this works
            // both for links in the profile text and the profile itself.
            if(type == ".twitter-icon")
            {
                let parts = url.pathname.split("/");
                label = parts.length > 1? ("@" + parts[1]):"Twitter";
            }

            if(label == null)
                label = a.href;
            a.dataset.popup = label;

            if(type != null)
            {
                entry.querySelector(".default-icon").hidden = true;
                entry.querySelector(type).hidden = false;
            }

            // Add the node at the start, so earlier links are at the right.  This makes the
            // more important links less likely to move around.
            row.insertAdjacentElement("afterbegin", entry);
        }

        // Tell the context menu which user is being viewed (if we're viewing a user-specific
        // search).
        main_context_menu.get.user_id = user_id;
    }

    // Refresh the autoplay buttons.
    refresh_autoplay_button()
    {
        // For local images, set file=*.  For Pixiv, set the illust_id to *.
        let args = helpers.args.location;
        if(this.data_source.name == "vview")
            args.hash.set("file", "*");
        else
            this.data_source.set_current_illust_id("*", args);

        args.hash.set("autoplay", "1");
        args.hash.set("view", "illust");

        for(let node of this.container.querySelectorAll("A.autoplay"))
            node.href = args.url;
    }

    // Use different icons for sites where you can give the artist money.  This helps make
    // the string of icons more meaningful (some artists have a lot of them).
    find_link_image_type(url)
    {
        url = new URL(url);

        let alt_icons = {
            ".shopping-cart": [
                "dlsite.com",
                "fanbox.cc",
                "fantia.jp",
                "skeb.jp",
                "ko-fi.com",
                "dmm.co.jp",
            ],
            ".twitter-icon": [
                "twitter.com",
            ],
        };

        // Special case for old Fanbox URLs that were under the Pixiv domain.
        if((url.hostname == "pixiv.net" || url.hostname == "www.pixiv.net") && url.pathname.startsWith("/fanbox/"))
            return ".shopping-cart";

        for(let alt in alt_icons)
        {
            // "domain.com" matches domain.com and *.domain.com.
            for(let domain of alt_icons[alt])
            {
                if(url.hostname == domain)
                    return alt;

                if(url.hostname.endsWith("." + domain))
                    return alt;
            }
        }
        return null;
    };

    async set_active(active, { data_source })
    {
        if(this._active == active && this.data_source == data_source)
            return;

        let was_active = this._active;
        this._active = active;


        // We're either becoming active or inactive, or our data source is being changed.
        // Store our scroll position on the data source, so we can restore it if it's
        // reactivated.  There's only one instance of thumbnail_view, so this is safe.
        // Only do this if we were previously active, or we're hidden and scrollTop may
        // be 0.
        if(was_active && this.data_source)
            this.data_source.thumbnail_view_scroll_pos = this.scroll_container.scrollTop;

        await super.set_active(active);
        
        if(active)
        {
            this.set_data_source(data_source);

            this.initial_refresh_ui();
            this.refresh_ui();

            // Refresh the images now, so it's possible to scroll to entries, but wait to start
            // loading data to give the caller a chance to call scroll_to_illust_id(), which needs
            // to happen after refresh_images but before load_needed_thumb_data.  This way, if
            // we're showing a page far from the top, we won't load the first page that we're about
            // to scroll away from.
            this.refresh_images();

            this.container.querySelector(".search-results").focus();

            helpers.yield(() => {
                this.load_needed_thumb_data();
            });
        }
        else
        {
            this.stop_pulsing_thumbnail();

            main_context_menu.get.user_id = null;
        }
    }

    get active()
    {
        return this._active;
    }

    data_source_updated()
    {
        this.refresh_images();
        this.load_needed_thumb_data();
        this.refresh_ui();
    }

    // Recreate thumbnail images (the actual <img> elements).
    //
    // This is done when new pages are loaded, to create the correct number of images.
    // We don't need to do this when scrolling around or when new thumbnail data is available.
    refresh_images()
    {
        // Make a list of [illust_id, page] thumbs to add.
        let images_to_add = [];
        if(this.data_source != null)
        {
            let id_list = this.data_source.id_list;
            let min_page = id_list.get_lowest_loaded_page();
            let max_page = id_list.get_highest_loaded_page();
            let items_per_page = this.data_source.estimated_items_per_page;
            for(let page = min_page; page <= max_page; ++page)
            {
                let illust_ids = id_list.illust_ids_by_page.get(page);
                if(illust_ids == null)
                {
                    // This page isn't loaded.  Fill the gap with items_per_page blank entries.
                    for(let idx = 0; idx < items_per_page; ++idx)
                        images_to_add.push([null, page]);
                    continue;
                }

                // Create an image for each ID.
                for(let illust_id of illust_ids)
                    images_to_add.push({id: illust_id, page: page});
            }

            // If this data source supports a start page and we started after page 1, add the "load more"
            // button at the beginning.
            if(this.data_source.initial_page > 1)
                images_to_add.splice(0, 0, { id: "special:previous-page", page: null });
        }

        // Add thumbs.
        //
        // Most of the time we're just adding thumbs to the list.  Avoid removing or recreating
        // thumbs that aren't actually changing, which reduces flicker.
        //
        // Do this by looking for a range of thumbnails that matches a range in images_to_add.
        // If we're going to display [0,1,2,3,4,5,6,7,8,9], and the current thumbs are [4,5,6],
        // then 4,5,6 matches and can be reused.  We'll add [0,1,2,3] to the beginning and [7,8,9]
        // to the end.
        //
        // Most of the time we're just appending.  The main time that we add to the beginning is
        // the "load previous results" button.
        let ul = this.container.querySelector(".thumbnails");
        let next_node = ul.firstElementChild;

        // Make a dictionary of all illust IDs and pages, so we can look them up quickly.
        let images_to_add_index = {};
        for(let i = 0; i < images_to_add.length; ++i)
        {
            let entry = images_to_add[i];
            let illust_id = entry.id;
            let page = entry.page;
            let index = illust_id + "/" + page;
            images_to_add_index[index] = i;
        }

        let get_node_idx = function(node)
        {
            if(node == null)
                return null;

            let illust_id = node.dataset.id;
            let page = node.dataset.page;
            let index = illust_id + "/" + page;
            return images_to_add_index[index];
        }

        // Find the first match (4 in the above example).
        let first_matching_node = next_node;
        while(first_matching_node && get_node_idx(first_matching_node) == null)
            first_matching_node = first_matching_node.nextElementSibling;

        // If we have a first_matching_node, walk forward to find the last matching node (6 in
        // the above example).
        let last_matching_node = first_matching_node;
        if(last_matching_node != null)
        {
            // Make sure the range is contiguous.  first_matching_node and all nodes through last_matching_node
            // should match a range exactly.  If there are any missing entries, stop.
            let next_expected_idx = get_node_idx(last_matching_node) + 1;
            while(last_matching_node && get_node_idx(last_matching_node.nextElementSibling) == next_expected_idx)
            {
                last_matching_node = last_matching_node.nextElementSibling;
                next_expected_idx++;
            }
        }

        // If we have a matching range, save the scroll position relative to it, so if we add
        // new elements at the top, we stay scrolled where we are.  Otherwise, just restore the
        // current scroll position.
        let save_scroll = new SaveScrollPosition(this.scroll_container);
        if(first_matching_node)
            save_scroll.save_relative_to(first_matching_node);

        // If we have a range, delete all items outside of it.  Otherwise, just delete everything.
        while(first_matching_node && first_matching_node.previousElementSibling)
            first_matching_node.previousElementSibling.remove();

        while(last_matching_node && last_matching_node.nextElementSibling)
            last_matching_node.nextElementSibling.remove();

        if(!first_matching_node && !last_matching_node)
            helpers.remove_elements(ul);

        // If we have a matching range, add any new elements before it.
        if(first_matching_node)
        {
           let first_idx = get_node_idx(first_matching_node);
           for(let idx = first_idx - 1; idx >= 0; --idx)
           {
               let entry = images_to_add[idx];
               let illust_id = entry.id;
               let page = entry.page;
               let node = this.create_thumb(illust_id, page);
               first_matching_node.insertAdjacentElement("beforebegin", node);
               first_matching_node = node;
           }
        }

        // Add any new elements after the range.  If we don't have a range, just add everything.
        let last_idx = -1;
        if(last_matching_node)
           last_idx = get_node_idx(last_matching_node);

        for(let idx = last_idx + 1; idx < images_to_add.length; ++idx)
        {
            let entry = images_to_add[idx];
            let illust_id = entry.id;
            let page = entry.page;
            let node = this.create_thumb(illust_id, page);
            ul.appendChild(node);
        }

        if(this.container.offsetWidth == 0)
            return;

        let thumbnail_size = settings.get("thumbnail-size", 4);
        thumbnail_size = thumbnail_size_slider_widget.thumbnail_size_for_value(thumbnail_size);

        this.thumbnail_dimensions_style.textContent = helpers.make_thumbnail_sizing_style(ul, ".screen-search-container", {
            wide: true,
            size: thumbnail_size,
            max_columns: 5,

            // Set a minimum padding to make sure there's room for the popup text to fit between images.
            min_padding: 15,
        });

        // Restore the value of scrollTop from before we updated.  For some reason, Firefox
        // modifies scrollTop after we add a bunch of items, which causes us to scroll to
        // the wrong position, even though scrollRestoration is disabled.
        save_scroll.restore();
    }

    // Start loading data pages that we need to display visible thumbs, and start
    // loading thumbnail data for nearby thumbs.
    async load_needed_thumb_data()
    {
        // elements is a list of elements that are onscreen (or close to being onscreen).
        // We want thumbnails loaded for these, even if we need to load more thumbnail data.
        //
        // nearby_elements is a list of elements that are a bit further out.  If we load
        // thumbnail data for elements, we'll load these instead.  That way, if we scroll
        // up a bit and two more thumbs become visible, we'll load a bigger chunk.
        // That way, we make fewer batch requests instead of requesting two or three
        // thumbs at a time.

        // Make a list of pages that we need loaded, and illustrations that we want to have
        // set.
        var wanted_illust_ids = [];

        let elements = this.get_visible_thumbnails();
        for(var element of elements)
        {
            if(element.dataset.id != null)
            {
                // If this is an illustration, file or folder, add it to wanted_illust_ids so we
                // load its thumbnail info.  Don't do this if it's a user.
                if(helpers.parse_id(element.dataset.id).type != "user")
                    wanted_illust_ids.push(element.dataset.id);
            }
        }

        // We load pages when the last thumbs on the previous page are loaded, but the first
        // time through there's no previous page to reach the end of.  Always make sure the
        // first page is loaded (usually page 1).
        let load_page = null;
        let first_page = this.data_source? this.data_source.initial_page:1;
        if(this.data_source && !this.data_source.is_page_loaded_or_loading(first_page))
            load_page = first_page;

        // If the last thumb in the list is being loaded, we need the next page to continue.
        // Note that since get_visible_thumbnails returns thumbs before they actually scroll
        // into view, this will happen before the last thumb is actually visible to the user.
        var ul = this.container.querySelector(".thumbnails");
        if(load_page == null && elements.length > 0 && elements[elements.length-1] == ul.lastElementChild)
        {
            let last_element = elements[elements.length-1];
            load_page = parseInt(last_element.dataset.page)+1;
        }

        // Hide "no results" if it's shown while we load data.
        this.container.querySelector(".no-results").hidden = true;

        if(load_page != null)
        {
            var result = await this.data_source.load_page(load_page, { cause: "thumbnails" });

            // If this page didn't load, it probably means we've reached the end, so stop trying
            // to load more pages.
            if(!result)
                this.disable_loading_more_pages = true;
        }

        // If we have no IDs and nothing is loading, the data source is empty (no results).
        if(this.data_source && this.data_source.id_list.get_first_id() == null && !this.data_source.any_page_loading)
        {
            console.log("Showing no results");
            this.container.querySelector(".no-results").hidden = false;
        }

        if(!thumbnail_data.singleton().are_all_ids_loaded_or_loading(wanted_illust_ids))
        {
            // At least one visible thumbnail needs to be loaded, so load more data at the same
            // time.
            let nearby_illust_ids = this.get_thumbs_to_load();

            // Load the thumbnail data if needed.
            //
            // Loading thumbnail info here very rarely happens anymore, since every data
            // source provides thumbnail info with its illust IDs.
            thumbnail_data.singleton().get_thumbnail_info(nearby_illust_ids);
        }
        
        this.set_visible_thumbs();
    }

    // Handle clicks on the "load previous results" button.
    //
    // If we let the regular click handling in main_controller.set_current_data_source do this,
    // it'll notice that the requested page isn't loaded and create a new data source.  We know
    // we can view the previous page, so special case this so we don't lose the pages that are
    // already loaded.
    //
    // This can also trigger for the "return to start" button if we happen to be on page 2.
    async thumbnail_onclick(e)
    {
        // This only matters if the data source supports start pages.
        if(!this.data_source.supports_start_page)
            return;

        let a = e.target.closest("A");
        if(a == null)
            return;

        // Don't do this for the "return to start" button.  That page does link to the previous
        // page, but that button should always refresh so we scroll to the top, and not just add
        // the previous page above where we are like this does.
        if(a.classList.contains("load-first-page-link"))
            return;

        if(a.classList.contains("load-previous-page-link"))
        {
            let page = this.data_source.id_list.get_lowest_loaded_page() - 1;
            this.load_page(page);

            e.preventDefault();
            e.stopImmediatePropagation();
        }
    }

    // See if we can load page in-place.  Return true if we were able to, and the click that
    // requested it should be cancelled, or false if we can't and it should be handled as a
    // regular navigation.
    async load_page(page)
    {
        // We can only add pages that are immediately before or after the pages we currently have.
        let min_page = this.data_source.id_list.get_lowest_loaded_page();
        let max_page = this.data_source.id_list.get_highest_loaded_page();
        if(page < min_page-1)
            return false;
        if(page > max_page+1)
            return false;
        
        console.log("Loading page:", page);
        await this.data_source.load_page(page, { cause: "previous page" });
        return true;
    }

    update_from_settings()
    {
        var thumbnail_mode = settings.get("thumbnail-size");
        this.set_visible_thumbs();
        this.refresh_images();

        helpers.set_class(document.body, "light", settings.get("theme") == "light");
        helpers.set_class(document.body, "disable-thumbnail-panning", settings.get("disable_thumbnail_panning"));
        helpers.set_class(document.body, "disable-thumbnail-zooming", settings.get("disable_thumbnail_zooming"));
        helpers.set_class(document.body, "ui-on-hover", settings.get("ui-on-hover"));
        helpers.set_class(this.container.querySelector(".recent-history-link"), "disabled", !ppixiv.recently_seen_illusts.get().enabled);

        // Flush the top UI transition, so it doesn't animate weirdly when toggling ui-on-hover.
        for(let box of document.querySelectorAll(".top-ui-box"))
        {
            box.classList.add("disable-transition");
            box.offsetHeight;
            box.classList.remove("disable-transition");
        }
    }

    // Set the URL for all loaded thumbnails that are onscreen.
    //
    // This won't trigger loading any data (other than the thumbnails themselves).
    set_visible_thumbs()
    {
        // Make a list of IDs that we're assigning.
        var elements = this.get_visible_thumbnails();
        var illust_ids = [];
        for(var element of elements)
        {
            if(element.dataset.id == null)
                continue;
            illust_ids.push(element.dataset.id);
        }        

        for(var element of elements)
        {
            var illust_id = element.dataset.id;
            if(illust_id == null)
                continue;

            var search_mode = this.data_source.search_mode;

            let { id: thumb_id, type: thumb_type } = helpers.parse_id(illust_id);

            // For illustrations, get thumbnail info.  If we don't have it yet, skip the image (leave it pending)
            // and we'll come back once we have it.
            if(thumb_type == "illust" || thumb_type == "file" || thumb_type == "folder")
            {
                // Get thumbnail info.
                var info = thumbnail_data.singleton().get_one_thumbnail_info(illust_id);
                if(info == null)
                    continue;
            }
            
            // Leave it alone if it's already been loaded.
            if(!("pending" in element.dataset))
                continue;

            // Why is this not working in FF?  It works in the console, but not here.  Sandboxing
            // issue?
            // delete element.dataset.pending;
            element.removeAttribute("data-pending");

            if(thumb_type == "user" || thumb_type == "bookmarks")
            {
                // This is a user thumbnail rather than an illustration thumbnail.  It just shows a small subset
                // of info.
                let user_id = thumb_id;

                var link = element.querySelector("a.thumbnail-link");
                if(thumb_type == "user")
                    link.href = `/users/${user_id}/artworks#ppixiv`;
                else
                    link.href = `/users/${user_id}/bookmarks/artworks#ppixiv`;

                link.dataset.userId = user_id;

                let quick_user_data = thumbnail_data.singleton().get_quick_user_data(user_id);
                if(quick_user_data == null)
                {
                    // We should always have this data for users if the data source asked us to display this user.
                    throw "Missing quick user data for user ID " + user_id;
                }
                
                var thumb = element.querySelector(".thumb");
                thumb.src = quick_user_data.profileImageUrl;

                var label = element.querySelector(".thumbnail-label");
                label.hidden = false;
                label.querySelector(".label").innerText = quick_user_data.userName;

                // Point the "similar illustrations" thumbnail button to similar users for this result, so you can
                // chain from one set of suggested users to another.
                element.querySelector("A.similar-illusts-button").href = "/discovery/users#ppixiv?user_id=" + user_id;
                continue;
            }

            if(thumb_type != "illust" && thumb_type != "file" && thumb_type != "folder")
                throw "Unexpected thumb type: " + thumb_type;

            // Set this thumb.
            let url = info.previewUrls[0];
            var thumb = element.querySelector(".thumb");

            // Check if this illustration is muted (blocked).
            var muted_tag = muting.singleton.any_tag_muted(info.tagList);
            var muted_user = muting.singleton.is_muted_user_id(info.userId);
            if(muted_tag || muted_user)
            {
                element.classList.add("muted");

                // The image will be obscured, but we still shouldn't load the image the user blocked (which
                // is something Pixiv does wrong).  Load the user profile image instead.
                thumb.src = thumbnail_data.singleton().get_profile_picture_url(info.userId);

                let muted_label = element.querySelector(".muted-label");

                // Quick hack to look up translations, since we're not async:
                (async() => {
                    if(muted_tag)
                        muted_tag = await tag_translations.get().get_translation(muted_tag);
                    muted_label.textContent = muted_tag? muted_tag:info.userName;
                })();

                // We can use this if we want a "show anyway' UI.
                thumb.dataset.mutedUrl = url;
            }
            else
            {
                thumb.src = url;

                // The search page thumbs are always square (aspect ratio 1).
                helpers.set_thumbnail_panning_direction(element, info.width, info.height, 1);
            }

            // Set the link.  Setting dataset.illustId will allow this to be handled with in-page
            // navigation, and the href will allow middle click, etc. to work normally.
            //
            // If we're on the followed users page, set these to the artist page instead.
            var link = element.querySelector("a.thumbnail-link");
            if(search_mode == "users")
            {
                link.href = "/users/" + info.userId + "#ppixiv";
            }
            else if(thumb_type == "folder")
            {
                // This is a local directory.  We only expect to see this while on the local
                // data source.  The folder link retains any search parameters in the URL.
                let args = helpers.args.location;
                local_api.get_args_for_id(illust_id, args);
        
                let link = element.querySelector("a.thumbnail-link");
                link.href = args.url;

                element.querySelector(".page-count-box").hidden = false;
            }
            else
            {
                link.href = helpers.get_url_for_id(illust_id);
            }

            link.dataset.illustId = illust_id;
            if(illust_id != -1)
                link.dataset.userId = info.userId;

            // Don't show this UI when we're in the followed users view.
            if(search_mode == "illusts")
            {
                if(info.illustType == 2 || info.illustType == "video")
                    element.querySelector(".ugoira-icon").hidden = false;

                if(info.pageCount > 1)
                {
                    var pageCountBox = element.querySelector(".page-count-box");
                    pageCountBox.hidden = false;
                    element.querySelector(".page-count-box .page-count").textContent = info.pageCount;
                    element.querySelector(".page-count-box .page-count").hidden = false;

                    let args = new helpers.args(link.href);
                    args.hash.set("view", "manga");
                    pageCountBox.href = args.url;
                }
            }

            helpers.set_class(element, "dot", helpers.tags_contain_dot(info));

            // On most pages, the suggestions button in thumbnails shows similar illustrations.  On following,
            // show similar artists instead.
            if(search_mode == "users")
                element.querySelector("A.similar-illusts-button").href = "/discovery/users#ppixiv?user_id=" + info.userId;
            else
                element.querySelector("A.similar-illusts-button").href = "/bookmark_detail.php?illust_id=" + illust_id + "#ppixiv?recommendations=1";

            this.refresh_bookmark_icon(element);

            // Set the label.  This is only actually shown in following views.
            var label = element.querySelector(".thumbnail-label");
            if(search_mode == "users") {
                label.hidden = false;
                label.querySelector(".label").innerText = info.userName;
            }
            else if(thumb_type == "folder")
            {
                // The ID is based on the filename.  Use it to show the directory name in the thumbnail.
                let parts = illust_id.split("/");
                let basename = parts[parts.length-1];
                let label = element.querySelector(".thumbnail-label");
                label.hidden = false;
                label.querySelector(".label").innerText = basename;
            } else {
                label.hidden = true;
            }
        }        

        if(this.data_source != null)
        {
            // Set the link for the first page and previous page buttons.  Most of the time this is handled
            // by our in-page click handler.
            let page = this.data_source.get_start_page(helpers.args.location);
            let previous_page_link = this.container.querySelector("a.load-previous-page-link");
            if(previous_page_link)
            {
                let args = helpers.args.location;
                this.data_source.set_start_page(args, page-1);
                previous_page_link.href = args.url;
            }

            let first_page_link = this.container.querySelector("a.load-first-page-link");
            if(first_page_link)
            {
                let args = helpers.args.location;
                this.data_source.set_start_page(args, 1);
                first_page_link.href = args.url;
            }
        }
    }

    // Refresh the thumbnail for illust_id.
    //
    // This is used to refresh the bookmark icon when changing a bookmark.
    refresh_thumbnail(illust_id)
    {
        var ul = this.container.querySelector(".thumbnails");
        var thumbnail_element = ul.querySelector("[data-id=\"" + helpers.escape_selector(illust_id) + "\"]");
        if(thumbnail_element == null)
            return;
        this.refresh_bookmark_icon(thumbnail_element);
    }

    // Set the bookmarked heart for thumbnail_element.  This can change if the user bookmarks
    // or un-bookmarks an image.
    refresh_bookmark_icon(thumbnail_element)
    {
        if(this.data_source && this.data_source.search_mode == "users")
            return;

        var illust_id = thumbnail_element.dataset.id;
        if(illust_id == null)
            return;

        // Get thumbnail info.
        var thumbnail_info = thumbnail_data.singleton().get_one_thumbnail_info(illust_id);
        if(thumbnail_info == null)
            return;

        var show_bookmark_heart = thumbnail_info.bookmarkData != null;
        if(this.data_source != null && !this.data_source.show_bookmark_icons)
            show_bookmark_heart = false;
        
        thumbnail_element.querySelector(".heart.public").hidden = !show_bookmark_heart || thumbnail_info.bookmarkData.private;
        thumbnail_element.querySelector(".heart.private").hidden = !show_bookmark_heart || !thumbnail_info.bookmarkData.private;
    }

    // Return a list of thumbnails that are either visible, or close to being visible
    // (so we load thumbs before they actually come on screen).
    get_visible_thumbnails()
    {
        // If the container has a zero height, that means we're hidden and we don't want to load
        // thumbnail data at all.
        if(this.container.offsetHeight == 0)
            return [];

        // Don't include data-special, which are non-thumb entries like "load previous results".
        return this.container.querySelectorAll(`.thumbnails > [data-id][data-nearby]:not([data-special])`);
    }

    // Get a given number of thumb that should be loaded, starting with thumbs that are onscreen
    // and working outwards until we have enough.
    get_thumbs_to_load(count=100)
    {
        // If the container has a zero height, that means we're hidden and we don't want to load
        // thumbnail data at all.
        if(this.container.offsetHeight == 0)
            return [];

        let results = [];
        let add_element = (element) =>
        {
            if(element == null)
                return;

            let illust_id = element.dataset.id;
            if(illust_id == null)
                return;

            let { type } = helpers.parse_id(illust_id);
            if(type == "user")
                return;

            // Skip this thumb if it's already loading.
            if(thumbnail_data.singleton().is_id_loaded_or_loading(illust_id))
                return;

            results.push(illust_id);
        }
        
        let onscreen_thumbs = this.container.querySelectorAll(`.thumbnails > [data-id][data-fully-on-screen]`);
        if(onscreen_thumbs.length == 0)
            return [];

        // First, add all thumbs that are onscreen, so these are prioritized.
        for(let thumb of onscreen_thumbs)
            add_element(thumb);

        // Walk forwards and backwards around the initial results.
        let forwards = onscreen_thumbs[onscreen_thumbs.length-1];
        let backwards = onscreen_thumbs[0];
        while(forwards || backwards)
        {
            if(results.length >= count)
                break;
            if(forwards)
                forwards = forwards.nextElementSibling;
            if(backwards)
                backwards = backwards.previousElementSibling;

            add_element(forwards);
            add_element(backwards);
        }

        return results;
    }

    // Create a thumb placeholder.  This doesn't load the image yet.
    //
    // illust_id is the illustration this will be if it's displayed, or null if this
    // is a placeholder for pages we haven't loaded.  page is the page this illustration
    // is on (whether it's a placeholder or not).
    create_thumb(illust_id, page)
    {
        let entry = null;
        if(illust_id == "special:previous-page")
        {
            entry = this.create_template({ name: "load-previous-results", html: `
                <div class="thumbnail-load-previous">
                    <div class=load-previous-buttons>
                        <a class="load-previous-button load-first-page-link" href=#>
                            Return to start
                        </a>
                        <a class="load-previous-button load-previous-page-link" href=#>
                            Load previous results
                        </a>
                    </div>
                </div>
            `});
        }
        else
        {
            entry = this.create_template({ name: "template-thumbnail", html: `
                <div class=thumbnail-box>
                    <div class=thumbnail-inner>
                        <a class=thumbnail-link href=#>
                            <img class=thumb>
                        </a>

                        <div class=last-viewed-image-marker>
                            <ppixiv-inline class=last-viewed-image-marker src="resources/last-viewed-image-marker.svg"></ppixiv-inline>
                        </div>

                        <div class=bottom-row>
                            <div class=bottom-left-icon>
                                <div class="heart button-bookmark public bookmarked" hidden>
                                    <ppixiv-inline src="resources/heart-icon.svg"></ppixiv-inline>
                                </div>
                                <div class="heart button-bookmark private bookmarked" hidden>
                                    <ppixiv-inline src="resources/heart-icon.svg"></ppixiv-inline>
                                </div>
                                <a hidden href=# class="similar-illusts-button bulb-button grey-icon">
                                    <ppixiv-inline src="resources/related-illusts.svg"></ppixiv-inline>
                                </a>
                            </div>

                            <div style="flex: 1;"></div>

                            <div class=thumbnail-label hidden>
                                <span class="thumbnail-ellipsis-box">
                                    <span class=label></span>
                                </span>
                            </div>

                            <div style="flex: 1;"></div>

                            <div class=bottom-right-icon>
                                <div class=ugoira-icon hidden>
                                    <ppixiv-inline src="resources/play-button.svg"></ppixiv-inline>
                                </div>

                                <a class=page-count-box hidden>
                                    <span class=page-icon>
                                        <img class=regular src="ppixiv:resources/page-icon.png">
                                        <img class=hover src="ppixiv:resources/page-icon-hover.png">
                                    </span>
                                    <span class=page-count hidden>1234</span>
                                </a>
                            </div>
                        </div>
                        <div class=muted-text>
                            <span>Muted:</span>
                            <span class=muted-label></span>
                        </div>
                    </div>
                </div>
            `});
        }

        // If this is a non-thumb entry, mark it so we ignore it for "nearby thumb" handling, etc.
        if(illust_id == "special:previous-page")
            entry.dataset.special = 1;

        // Mark that this thumb hasn't been filled in yet.
        entry.dataset.pending = true;

        if(illust_id != null)
            entry.dataset.id = illust_id;

        if(page != null)
            entry.dataset.page = page;
        for(let observer of this.intersection_observers)
            observer.observe(entry);
        return entry;
    }

    // This is called when thumbnail_data has loaded more thumbnail info.
    thumbs_loaded(e)
    {
        this.set_visible_thumbs();
    }

    // Scroll to illust_id if it's available.  This is called when we display the thumbnail view
    // after coming from an illustration.
    scroll_to_illust_id(illust_id)
    {
        var thumb = this.container.querySelector("[data-id='" + helpers.escape_selector(illust_id) + "']");
        if(thumb == null)
            return;

        // If the item isn't visible, center it.
        let scroll_pos = this.scroll_container.scrollTop;
        if(thumb.offsetTop < scroll_pos || thumb.offsetTop + thumb.offsetHeight > scroll_pos + this.scroll_container.offsetHeight)
            this.scroll_container.scrollTop = thumb.offsetTop + thumb.offsetHeight/2 - this.scroll_container.offsetHeight/2;
    };

    pulse_thumbnail(illust_id)
    {
        var thumb = this.container.querySelector("[data-id='" + helpers.escape_selector(illust_id) + "']");
        if(thumb == null)
            return;

        this.stop_pulsing_thumbnail();

        this.flashing_image = thumb;
        thumb.classList.add("flash");
    };

    // Work around a bug in CSS animations: even if animation-iteration-count is 1,
    // the animation will play again if the element is hidden and displayed again, which
    // causes previously-flashed thumbnails to flash every time we exit and reenter
    // thumbnails.
    stop_pulsing_thumbnail()
    {
        if(this.flashing_image == null)
            return;

        this.flashing_image.classList.remove("flash");
        this.flashing_image = null;
    };

    // Handle submitting searches on the user search page.
    submit_user_search(e)
    {
        let search = this.container.querySelector(".user-search-box input.search-users").value;
        let url = new URL("/search_user.php#ppixiv", ppixiv.location);
        url.searchParams.append("nick", search);
        url.searchParams.append("s_mode", "s_usr");
        helpers.set_page_url(url, true);
    }
    
    handle_onkeydown(e)
    {
        // Pressing ^F while on the local search focuses the search box.
        if(this.data_source.name == "vview" && e.key.toUpperCase() == "F" && e.ctrlKey)
        {
            this.container.querySelector(".local-tag-search-box input").focus();
            e.preventDefault();
            e.stopPropagation();
        }
    }
};

