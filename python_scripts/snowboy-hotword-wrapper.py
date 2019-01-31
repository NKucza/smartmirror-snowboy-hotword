import snowboydecoder
import json, sys, os, signal

BASE_DIR = os.path.dirname(__file__) + '/'
os.chdir(BASE_DIR)

def to_node(type, message):
	# convert to json and print (node helper will read from stdout)
	try:
		print(json.dumps({type: message}))
	except Exception:
		pass
	# stdout has to be flushed manually to prevent delays in the node helper communication
	sys.stdout.flush()


def detected_callback():
	to_node("triggered", "jarvis")


to_node("status", "python: snowboy is starting...")
detector = snowboydecoder.HotwordDetector("jarvis.umdl", sensitivity=[0.8,0.8], audio_gain=1)
to_node("status", "python: snowboy detector created")

detector.start(detected_callback)
