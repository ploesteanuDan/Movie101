# IMPORTS
from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL

# APP
app = Flask(__name__)
mysql = MySQL(app)

# DB CONFIG
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'dan'
app.config['MYSQL_PASSWORD'] = 'sqlpass23'
app.config['MYSQL_DB'] = 'moviesandproducers'

# ROUTES
# ----- MOVIES ----- MOVIES ----- MOVIES ----- MOVIES ----- MOVIES -----


@app.route('/movies/<int:val>', methods=['GET', 'DELETE', 'PUT'])
@app.route('/movies', methods=['GET', 'POST'], defaults={"val": 2})
def movies(val):
    cursor = mysql.connection.cursor()
# ----------------- GET WITH ISBANNER ----------------------------------------------
    if request.method == 'GET':
        # -----
        if val == 2:
            cursor.execute('SELECT * FROM movies')
        elif val == 1 or val == 0:
            cursor.execute('SELECT * FROM movies WHERE isBanner = %s' % val)
        # -----
        r = [dict((cursor.description[i][0], value)
                  for i, value in enumerate(row)) for row in cursor.fetchall()]
        return jsonify({'myCollection': r})
# ----------------- DEL WITH MOVIEID ----------------------------------------------
    elif request.method == 'DELETE':
        cursor.execute('DELETE FROM movies WHERE movieID = %s' % val)
        # -----
        mysql.connection.commit()
        cursor.close()
        return "Movie with movieID SET " + str(val) + " was deleted."
# ----------------- PUT WITH MOVIEID ----------------------------------------------
    elif request.method == 'PUT':
        jsonData = request.get_json()
        values = jsonData['values']
        # -----
        cursor.execute('UPDATE movies SET ' + values +
                       ' WHERE movieID = %s' % val)
        # -----
        mysql.connection.commit()
        cursor.close()
        return "Movie with movieID " + str(val) + " was updated."
# ----------------- POST WITH NOTHING ----------------------------------------------
    elif request.method == 'POST':
        jsonData = request.get_json()
        movieName = jsonData['movieName']
        movieYear = jsonData['movieYear']
        movieType = jsonData['movieType']
        moviePlot = jsonData['moviePlot']
        movieThumbnail = jsonData['movieThumbnail']
        movieTrailer = jsonData['movieTrailer']
        isBanner = jsonData['isBanner']
        movieBanner = jsonData['movieBanner']
        # -----
        cursor.execute(
            ''' INSERT INTO movies (movieName, movieYear, movieType, moviePlot, movieThumbnail, movieTrailer, isBanner, movieBanner) 
            VALUES(%s,%s,%s,%s,%s,%s,%s,%s)''',
            (movieName, movieYear, movieType, moviePlot, movieThumbnail, movieTrailer, isBanner, movieBanner))
        # -----
        mysql.connection.commit()
        cursor.close()
        return "Movie with movieName " + movieName + " was added."


# ----- PRODDUCERS ----- PRODDUCERS ----- PRODDUCERS ----- PRODDUCERS ----- PRODDUCERS -----
@app.route('/producers/<int:val>', methods=['DELETE', 'PUT'])
@app.route('/producers', methods=['GET', 'POST'], defaults={"val": None})
def producers(val):
    cursor = mysql.connection.cursor()
# ----------------- GET WITH NOTHING ----------------------------------------------
    if request.method == 'GET':
        # -----
        cursor.execute('SELECT * FROM producers')
        # -----
        r = [dict((cursor.description[i][0], value)
                  for i, value in enumerate(row)) for row in cursor.fetchall()]
        return jsonify({'myCollection': r})
# ----------------- DEL WITH PRODUCERID ----------------------------------------------
    elif request.method == 'DELETE':
        cursor.execute('DELETE FROM producers WHERE producerID = %s' % val)
        # -----
        mysql.connection.commit()
        cursor.close()
        return "Producer with producerID " + str(val) + " was deleted."
# ----------------- PUT WITH PRODUCERID ----------------------------------------------
    elif request.method == 'PUT':
        jsonData = request.get_json()
        values = jsonData['values']
        # -----
        cursor.execute('UPDATE producers SET ' + values +
                       ' WHERE producerID = %s' % val)
        # -----
        mysql.connection.commit()
        cursor.close()
        return "Producer with producerID " + str(val) + " was updated."
# ----------------- POST WITH NOTHING ----------------------------------------------
    elif request.method == 'POST':
        jsonData = request.get_json()
        producerName = jsonData['producerName']
        producerNationality = jsonData['producerNationality']
        producerBorn = jsonData['producerBorn']
        producerThumbnail = jsonData['producerThumbnail']
        producerQuote = jsonData['producerQuote']
        # -----
        cursor.execute(
            ''' INSERT INTO producers (producerName, producerBorn, producerNationality, producerThumbnail, producerQuote)
            VALUES(%s,%s,%s,%s,%s)''',
            (producerName, producerBorn, producerNationality, producerThumbnail, producerQuote))
        # -----
        mysql.connection.commit()
        cursor.close()
        return "Producer with producerName " + producerName + " was added."


# ----- STUDIOS ----- STUDIOS ----- STUDIOS ----- STUDIOS ----- STUDIOS -----
@app.route('/studios/<int:val>', methods=['DELETE', 'PUT'])
@app.route('/studios', methods=['GET', 'POST'], defaults={"val": None})
def studios(val):
    cursor = mysql.connection.cursor()
# ----------------- GET WITH NOTHING----------------------------------------------
    if request.method == 'GET':
        # -----
        cursor.execute('SELECT * FROM studios')
        # -----
        r = [dict((cursor.description[i][0], value)
                  for i, value in enumerate(row)) for row in cursor.fetchall()]
        return jsonify({'myCollection': r})
# ----------------- DEL WITH STUDIOID ----------------------------------------------
    elif request.method == 'DELETE':
        cursor.execute('DELETE FROM studios WHERE sutdioID = %s' % val)
        # -----
        mysql.connection.commit()
        cursor.close()
        return "Studio with studioID " + str(val) + " was deleted."
# ----------------- PUT WITH STUDIOID ----------------------------------------------
    elif request.method == 'PUT':
        jsonData = request.get_json()
        values = jsonData['values']
        # -----
        cursor.execute('UPDATE studios SET ' + values +
                       ' WHERE sutdioID = %s' % val)
        # -----
        mysql.connection.commit()
        cursor.close()
        return "Studio with studioID " + str(val) + " was updated."
# ----------------- POST WITH NOTHING ----------------------------------------------
    elif request.method == 'POST':
        jsonData = request.get_json()
        studioName = jsonData['studioName']
        # -----
        cursor.execute(
            ''' INSERT INTO studios (studioName)
            VALUES(%s)''',
            (studioName))
        # -----
        mysql.connection.commit()
        cursor.close()
        return "Studio with studioName " + studioName + " was added."


# ----- JOINTABLE ----- JOINTABLE ----- JOINTABLE ----- JOINTABLE ----- JOINTABLE -----
@app.route('/jointable/<int:val>', methods=['DELETE', 'PUT'])
@app.route('/jointable', methods=['GET', 'POST'], defaults={"val": None})
def jointable(val):
    cursor = mysql.connection.cursor()
# ----------------- GET WITH NOTHING ----------------------------------------------
    if request.method == 'GET':
        # -----
        cursor.execute('SELECT * FROM jointable')
        # -----
        r = [dict((cursor.description[i][0], value)
                  for i, value in enumerate(row)) for row in cursor.fetchall()]
        return jsonify({'myCollection': r})
# ----------------- DEL WITH JOINID ----------------------------------------------
    elif request.method == 'DELETE':
        cursor.execute('DELETE FROM jointable WHERE joinID = %s' % val)
        # -----
        mysql.connection.commit()
        cursor.close()
        return "Join with joinID " + str(val) + " was deleted."
# ----------------- PUT WITH JOINID ----------------------------------------------
    elif request.method == 'PUT':
        jsonData = request.get_json()
        values = jsonData['values']
        # -----
        cursor.execute('UPDATE jointable SET ' + values +
                       ' WHERE joinID = %s' % val)
        # -----
        mysql.connection.commit()
        cursor.close()
        return "Join with joinID " + str(val) + " was updated."
# ----------------- POST WITH NOTHING ----------------------------------------------
    elif request.method == 'POST':
        jsonData = request.get_json()
        movieID = jsonData['movieID']
        producerID = jsonData['producerID']
        studioID = jsonData['studioID']
        # -----
        cursor.execute(
            ''' INSERT INTO jointable (movieID, studioID, producerID)
            VALUES(%s,%s,%s)''',
            (movieID, studioID, producerID))
        # -----
        mysql.connection.commit()
        cursor.close()
        return "Join was added."


app.run(debug=True)
