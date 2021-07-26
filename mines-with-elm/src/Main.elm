module Main exposing (..)

import Browser
import Html exposing (..)

type alias Cell =
    { value: Int
    , isSelected: Bool
    }

type GameState
    = GameWon
    | GameLost
    | GameInProgress
    | GameSettings


type alias Model =
    { gameState: GameState
    , gameBoard: List Cell
    }


type Msg
    = None


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        None ->
            ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none

-- * ------ View ------- * --

gameOptions : List (Html Msg)
gameOptions =
    [ div [] []
    , div [] []
    , div [] []
    , div [] []
    ]

gameSettingsView : Html Msg
gameSettingsView =
    div []
        gameOptions

view : Model -> Html Msg
view model =
    case model.gameState of
        GameSettings ->
            gameSettingsView
        _ ->
            div []
                [ text "New Element" ]

-- * ------ Main ------- * --

initModel : (Model, Cmd Msg)
initModel =
    ( {
        gameState = GameSettings
      , gameBoard = []
      }
    , Cmd.none
    )


main : Program () Model Msg
main =
    Browser.element
        { init = \_ -> initModel
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
