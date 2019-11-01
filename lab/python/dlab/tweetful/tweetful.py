import authorization
import json
import requests
from collections import defaultdict
import operator
from urls import *
import argparse
import sys

def where_from(timeline):
    """Make a dict of the locations of friends from user's current timeline"""
    total = 0
    locs = defaultdict(int)
    for tweet in timeline:
        try:
            key = tweet["user"]["location"]
        except KeyError:
            continue
        locs[key] += 1
        total += 1
    try:
        val = locs.pop('')
        locs["No Location Given"] = val
    except KeyError:
        pass

    return total, locs

def popular(friend_list, size):
    """Find friends with the most foloowers on Twitter"""
    followers = []
    for friend in friend_list["users"]:
        followers.append((friend["name"],friend["followers_count"]))
    sorted_followers = sorted(followers, key=operator.itemgetter(1),
        reverse=True)
    return sorted_followers[:size]

def make_parser():
    """Construct command line parser"""
    description = "Learn some statistics about your Twitter account"
    parser = argparse.ArgumentParser(description=description)

    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    #Parser for where command
    where_parser = subparsers.add_parser("where", 
        help="Find the percentage of tweets on your timeline from different locations")
    where_parser.add_argument("name", help="Your Twitter username")
    
    #Parser for popular command
    popular_parser = subparsers.add_parser("popular", 
        help="Find your friends with the highest number of followers")
    popular_parser.add_argument("name", help="Your Twitter username")
    popular_parser.add_argument("size", type=int, default=10, 
        nargs="?", help="Size of the popularity list to be returned")

    return parser

def main():
    """Main function"""
    parser = make_parser()
    arguments = parser.parse_args(sys.argv[1:])
    # Convert parsed arguments from Namespace to dictionary
    arguments = vars(arguments)
    command = arguments.pop("command")

    if command == "where":
        auth = authorization.authorize(arguments['name'])
        response = requests.get(TIMELINE_URL, auth=auth)
        total, locs = where_from(response.json())
        sorted_locs = sorted(locs.iteritems(),
        key=operator.itemgetter(1),
        reverse=True)

        for loc, tweets in sorted_locs:
            print "{}: {:.1%}".format(loc, tweets/float(total))

    if command == "popular":
        auth = authorization.authorize(arguments['name'])
        response = requests.get(FRIENDS_URL, auth=auth)
        pop_list = popular(response.json(),arguments['size'])
        for item in pop_list:
            print "{} : {:,} followers".format(item[0], item[1])
    



if __name__ == '__main__':
    main()