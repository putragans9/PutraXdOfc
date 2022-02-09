const {
	MessageType
} = require("@adiwajshing/baileys");
const fs = require("fs-extra")

const { getBuffer } = require('../lib/myfunc')
const { color, bgcolor } = require('../lib/color')
join = '\`\`\`New Member\`\`\` \n \`\`\`Nama :\`\`\` \n \`\`\`Askot : \`\`\` \n \`\`\`Umur :\`\`\` \n \`\`\`Status :\`\`\` \n\n - [ 𝙋𝙐𝙏𝙍𝘼 𝘽𝙊𝙏 ] '
leave = '\`\`\`Sayonaraa\`\`\`'

teks = `${join}`
let setting = JSON.parse(fs.readFileSync('./setting.json'))

module.exports = welcome = async (Putra, anu) => {
	    const welkom = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
	    const isWelcome = welkom.includes(anu.jid)
	    if (!isWelcome) return
		try {
			    mem = anu.participants[0]
			    console.log(anu)
                try {
                pp_user = await Putra.getProfilePicture(mem)
                } catch (e) {
                pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
                try {
                pp_grup = await Putra.getProfilePicture(anu.jid)
                } catch (e) {
                pp_grup = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            if (anu.action == 'add' && mem.includes(Putra.user.jid)) {
            Putra.sendMessage(anu.jid, 'Halo! Terima Kasih sudah Mengundangku, Jika ingin Menggunakan Bot Ketik !menu', 'conversation')
            }
             if (anu.action == 'add' && !mem.includes(Putra.user.jid)) {
             if (!welkom.includes(anu.jid)) return
                mdata = await Putra.groupMetadata(anu.jid)
           
                memeg = mdata.participants.length
            	num = anu.participants[0]
                let v = Putra.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = v.vname || v.notify || num.split('@')[0]
            buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/welcome2?nama=${encodeURI(anu_user)}&descriminator=${memeg}&memcount=${memeg}&gcname=${encodeURI(mdata.subject)}&gcicon=${pp_grup}&pp=${pp_user}&bg=https://bit.ly/walpamikel`)
        buttons = [

          { buttonId: `!selamatdatang`, buttonText: { displayText: "Welcome👋" }, type: 1 },

        ];

        imageMsg = (

          await Putra.prepareMessageMedia(buff, "imageMessage", {

            thumbnail: buff,

          })

        ).imageMessage;

        buttonsMessage = {

          contentText: `${teks}`,

          footerText: "Welcome Message By PutraXd Ofc",

          imageMessage: imageMsg,

          buttons: buttons,

          headerType: 4,

        };

        prep = await Putra.prepareMessageFromContent(

          mdata.id,

          { buttonsMessage },

          {}

        );

        Putra.relayWAMessage(prep);

      }

      if (anu.action == "remove" && !mem.includes(Putra.user.jid)) {

        mdata = await Putra.groupMetadata(anu.jid);

        num = anu.participants[0];

        let w = Putra.contacts[num] || { notify: num.replace(/@.+/, "") };

        anu_user = w.vname || w.notify || num.split("@")[0];

        memeg = mdata.participants.length;

        out = `${leave}`;

        buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/goodbye2?nama=${encodeURI(anu_user)}&descriminator=${memeg}&memcount=${memeg}&gcname=${encodeURI(mdata.subject)}&gcicon=${pp_grup}&pp=${pp_user}&bg=https://bit.ly/walpamikel`)
            
        buttons = [

          { buttonId: `!bay`, buttonText: { displayText: "Sayonara👋" }, type: 1 },];

        imageMsg = (

          await Putra.prepareMessageMedia(buff, "imageMessage", {

            thumbnail: buff,

          })

        ).imageMessage;

        buttonsMessage = {

          contentText: `${out}`,

          footerText: "Leave Message By PutraXd Ofc",

          imageMessage: imageMsg,

          buttons: buttons,

          headerType: 4,

        };

        prep = await Putra.prepareMessageFromContent(

          mdata.id,

          { buttonsMessage },

          {}

        );

        Putra.relayWAMessage(prep);
        }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	}
