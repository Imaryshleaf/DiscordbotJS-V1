const yes = ['yes', 'y', 'ye', 'yeah', 'yup', 'yea', 'ya', 'hai', 'si', 'sí', 'oui', 'はい', 'correct'];
const no = ['no', 'n', 'nah', 'nope', 'nop', 'iie', 'いいえ', 'non', 'fuck off'];
const { SUCCESS_EMOJI_ID } = "728018127618703422";

module.exports = class Utility {
    /**
     * @param {Number} ms Time in miliseconds. 1000ms = 1 second
     */
	static delay(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    /**
     * @param {Array} array An array ["1","2","3"]
     */
	static shuffle(array) {
		const arr = array.slice(0);
		for (let i = arr.length - 1; i >= 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
		return arr;
    }
    
    /**
     * @param {Array} arr An array ["1","2","3"]
     * @param {Parameters} conj Conjunction. "conj = 'and'"
     */
	static list(arr, conj = 'and') {
		const len = arr.length;
		if (len === 0) return '';
		if (len === 1) return arr[0];
		return `${arr.slice(0, -1).join(', ')}${len > 1 ? `${len > 2 ? ',' : ''} ${conj} ` : ''}${arr.slice(-1)}`;
    }
    
    /**
     * @param {String} text Text content
     * @param {Parameters} maxLen "maxLen = 2000"
     */
	static shorten(text, maxLen = 2000) {
		return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
	}

    /**
     * @param {Number} min A numeric number
     * @param {Number} max A numeric number
     */
	static randomRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

    /**
     * @param {Array} arr An array ["1","2","3"]
     * @param {Parameters} maxLen "maxLen = 10"
     */
	static trimArray(arr, maxLen = 10) {
		if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
	}

    /**
     * @param {Array} arr An array ["1","2","3"]
     * @param {String} value A value
     */
	static removeFromArray(arr, value) {
		const index = arr.indexOf(value);
		if (index > -1) return arr.splice(index, 1);
		return arr;
	}

    /**
     * @param {Array} arr An array ["1","2","3"]
     */
	static removeDuplicates(arr) {
		if (arr.length === 0 || arr.length === 1) return arr;
		const newArr = [];
		for (let i = 0; i < arr.length; i++) {
			if (newArr.includes(arr[i])) continue;
			newArr.push(arr[i]);
		}
		return newArr;
	}
    /**
     * @param {Array} a An array ["1","2","3"]
     * @param {Array} b An array ["1","2","3"]
     */
	static arrayEquals(a, b) {
		return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, i) => val === b[i]);
	}

    /**
     * @param {Array} arr An array ["1","2","3"]
     * @param {String} prop Property
     */
	static sortByName(arr, prop) {
		return arr.sort((a, b) => {
			if (prop) return a[prop].toLowerCase() > b[prop].toLowerCase() ? 1 : -1;
			return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
		});
	}

    /**
     * @param {String} text Text Content
     * @param {String} split String separator
     */
	static firstUpperCase(text, split = ' ') {
		return text.split(split).map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ');
	}

    /**
     * @param {Number} number Numeric number
     * @param {Parameters} minimumFractionDigits "minimumFractionDigits = 0"
     */
	static formatNumber(number, minimumFractionDigits = 0) {
		return Number.parseFloat(number).toLocaleString(undefined, {
			minimumFractionDigits,
			maximumFractionDigits: 2
		});
	}

    /**
     * @param {Number} number Numeric number
     */
	static formatNumberK(number) {
		return number > 999 ? `${(number / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })}K` : number;
	}

    /**
     * @param {Date} time Date
     */
	static formatTime(time) {
		const min = Math.floor(time / 60);
		const sec = Math.floor(time - (min * 60));
		const ms = time - sec - (min * 60);
		return `${min}:${sec.toString().padStart(2, '0')}.${ms.toFixed(4).slice(2)}`;
	}

    /**
     * @param {*} stream 
     */
	static streamToArray(stream) {
		if (!stream.readable) return Promise.resolve([]);
		return new Promise((resolve, reject) => {
			const array = [];
			function onData(data) {
				array.push(data);
			}
			function onEnd(error) {
				if (error) reject(error);
				else resolve(array);
				cleanup();
			}
			function onClose() {
				resolve(array);
				cleanup();
			}
			function cleanup() {
				stream.removeListener('data', onData);
				stream.removeListener('end', onEnd);
				stream.removeListener('error', onEnd);
				stream.removeListener('close', onClose);
			}
			stream.on('data', onData);
			stream.on('end', onEnd);
			stream.on('error', onEnd);
			stream.on('close', onClose);
		});
	}

    /**
     * @param {*} pct 
     * @param {*} percentColors 
     */
	static percentColor(pct, percentColors) {
		let i = 1;
		for (i; i < percentColors.length - 1; i++) {
			if (pct < percentColors[i].pct) {
				break;
			}
		}
		const lower = percentColors[i - 1];
		const upper = percentColors[i];
		const range = upper.pct - lower.pct;
		const rangePct = (pct - lower.pct) / range;
		const pctLower = 1 - rangePct;
		const pctUpper = rangePct;
		const color = {
			r: Math.floor((lower.color.r * pctLower) + (upper.color.r * pctUpper)).toString(16).padStart(2, '0'),
			g: Math.floor((lower.color.g * pctLower) + (upper.color.g * pctUpper)).toString(16).padStart(2, '0'),
			b: Math.floor((lower.color.b * pctLower) + (upper.color.b * pctUpper)).toString(16).padStart(2, '0')
		};
		return `#${color.r}${color.g}${color.b}`;
	}

    /**
     * @param {*} timeZone 
     */
	static today(timeZone) {
		const now = new Date();
		now.setHours(0);
		now.setMinutes(0);
		now.setSeconds(0);
		now.setMilliseconds(0);
		if (timeZone) now.setUTCHours(now.getUTCHours() + timeZone);
		return now;
	}

    /**
     * @param {*} timeZone 
     */
	static tomorrow(timeZone) {
		const today = Util.today(timeZone);
		today.setDate(today.getDate() + 1);
		return today;
	}

    /**
     * @param {*} year 
     */
	static isLeap(year) {
		return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
	}

    /**
     * @param {*} magik 
     */
	static magikToBuffer(magik) {
		return new Promise((res, rej) => {
			magik.toBuffer((err, buffer) => {
				if (err) return rej(err);
				return res(buffer);
			});
		});
	}

    /**
     * @param {String} title 
     * @param {String} url 
     * @param {*} display 
     */
	static embedURL(title, url, display) {
		return `[${title}](${url.replaceAll(')', '%29')}${display ? ` "${display}"` : ''})`;
	}

    /**
     * @param {String} msg Message Listener
     * @param {*} user 
     * @param {*} emoji 
     * @param {*} fallbackEmoji 
     */
	static async reactIfAble(msg, user, emoji, fallbackEmoji) {
		const dm = !msg.guild;
		if (fallbackEmoji && (!dm && !msg.channel.permissionsFor(user).has('USE_EXTERNAL_EMOJIS'))) {
			emoji = fallbackEmoji;
		}
		if (dm || msg.channel.permissionsFor(user).has(['ADD_REACTIONS', 'READ_MESSAGE_HISTORY'])) {
			try {
				await msg.react(emoji);
			} catch {
				return null;
			}
		}
		return null;
	}

    /**
     * @param {String} channel Message.<Channel>
     * @param {*} user
     * @param {*} param2 
     * @example
     * const channel = await client.channels.cache.get(channelID)
     */
	static async verify(channel, user, { time = 30000, extraYes = [], extraNo = [] } = {}) {
		const filter = res => {
			const value = res.content.toLowerCase();
			return (user ? res.author.id === user.id : true)
				&& (yes.includes(value) || no.includes(value) || extraYes.includes(value) || extraNo.includes(value));
		};
		const verify = await channel.awaitMessages(filter, {
			max: 1,
			time
		});
		if (!verify.size) return 0;
		const choice = verify.first().content.toLowerCase();
		if (yes.includes(choice) || extraYes.includes(choice)) return true;
		if (no.includes(choice) || extraNo.includes(choice)) return false;
		return false;
	}

	/**
	 * 
	 * @param {*} msg Message Listener
	 * @param {*} max 
	 * @param {*} min 
	 */
	static async awaitPlayers(msg, max, min = 1) {
		if (max === 1) return [msg.author.id];
		const addS = min - 1 === 1 ? '' : 's';
		await msg.channel.send(
			`You will need at least ${min - 1} more player${addS} (at max ${max - 1}). To join, type \`join game\`.`
		);
		const joined = [];
		joined.push(msg.author.id);
		const filter = res => {
			if (res.author.bot) return false;
			if (joined.includes(res.author.id)) return false;
			if (res.content.toLowerCase() !== 'join game') return false;
			joined.push(res.author.id);
			Utility.reactIfAble(res, res.author, SUCCESS_EMOJI_ID, '✅');
			return true;
		};
		const verify = await msg.channel.awaitMessages(filter, { max: max - 1, time: 60000 });
		verify.set(msg.id, msg);
		if (verify.size < min) return false;
		return verify.map(player => player.author.id);
	}
};