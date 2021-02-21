from Naked.toolshed.shell import execute_js, muterun_js
import sys
import os

def resource_path(relative_path):
    base_path = getattr(sys, '_MEIPASS', os.path.dirname(os.path.abspath(__file__)))
    return os.path.join(base_path, relative_path)

try:
	execute_js(resource_path('./index.js'))
except:
	pass