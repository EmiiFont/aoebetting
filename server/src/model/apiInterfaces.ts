export interface ApiPlayer {
    profile_id:    number;
    steam_id:      string;
    name:          string;
    clan:          string;
    country:       string;
    slot:          number;
    slot_type:     number;
    rating:        number;
    rating_change: number;
    games:         number;
    wins:          number;
    streak:        number;
    drops:         number;
    color:         number;
    team:          number;
    civ:           number;
    won:           number;
}

export interface ApiPlayerMatch {
    profile_id: number;
    steam_id:   string;
    name:       string;
    country:    string;
    last_match: Match;
}

export interface Match {
    match_id:           string;
    lobby_id:           null;
    match_uuid:         string;
    version:            string;
    name:               string;
    num_players:        number;
    num_slots:          number;
    average_rating:     null;
    cheats:             boolean;
    full_tech_tree:     boolean;
    ending_age:         number;
    expansion:          null;
    game_type:          number;
    has_custom_content: null;
    has_password:       boolean;
    lock_speed:         boolean;
    lock_teams:         boolean;
    map_size:           number;
    map_type:           number;
    pop:                number;
    ranked:             boolean;
    leaderboard_id:     number;
    rating_type:        number;
    resources:          number;
    rms:                null;
    scenario:           null;
    server:             string;
    shared_exploration: boolean;
    speed:              number;
    starting_age:       number;
    team_together:      boolean;
    team_positions:     boolean;
    treaty_length:      number;
    turbo:              boolean;
    victory:            number;
    victory_time:       number;
    visibility:         number;
    opened:             number;
    started:            number;
    finished:           number;
    players:            ApiPlayer[];
}

export interface ApiContent {
    language:    string;
    age:         Description[];
    civ:         Description[];
    gameType:    Description[];
    leaderboard: Description[];
    mapSize:     Description[];
    mapType:     Description[];
    ratingType:  Description[];
    resources:   Description[];
    speed:       Description[];
    victory:     Description[];
    visibility:  Description[];
}

export interface Description{
 id: number;
 name: string;
}

export interface TournameEloPlayer {
    id:                     number;
    name:                   string;
    elo:                    number;
    rank:                   number;
    url:                    string;
    voobly_id:              number;
    steam_id:               string;
    first_series_timestamp: number;
    first_series_time:      string;
    peak_timestamp:         number;
    peak_time:              string;
    peak_elo:               number;
    inactive:               boolean;
    retired:                boolean;
    series_played:          number;
    series_won:             number;
    games_played:           number;
    tournaments_played:     number;
    tournaments_list:       number[];
}

export interface Tournament {
    id:              number;
    name:            string;
    url:             string;
    api_url:         string;
    start_timestamp: number;
    end_timestamp:   number;
}



