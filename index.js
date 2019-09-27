const TeleBot = require('.');
const axios = require('axios');
const qs = require('qs');
const bot_token = '841068209:AAHD_e_zn1jv06ZakE5S3ZgaI5H3VyEVG0M'
const bot = new TeleBot({
  token: bot_token,
  // usePlugins: ['askUser'],
  // pluginConfig: {
  // namedButtons: {
  // buttons: BUTTONS
  // }
  // }
});


// On start command
bot.on('/start', msg => {
  console.log(msg);
  const id = msg.chat.id;
  // Ask user name
  return bot.sendMessage(id, 'Heloo');

});

bot.on(['*', '/*'], (msg, self) => {
  let id = msg.from.id;
  let replyToMessage = msg.message_id;
  let type = self.type;
  let parseMode = 'html';

  console.log(msg);

  if (type == 'photo' || (type == 'private' && res.photo.length() != 0)) {
    var data = {
      token: 'asdasd',
      username: msg.from.username,
      link: msg.photo[0].file_id
    }

    bot.sendMessage(
      id, 'Mohon tunggu sebentar, sedang mencari data...'
    )

    axios.post('https://vera.smkn4bdg.sch.id/api/identify-telegram', qs.stringify(data))
      .then(response => {
        var data = response.data;
        if (!data) {
          return bot.sendMessage(
            id, 'Data tidak ditemukan'
          )
        } else {
          return bot.sendMessage(id,
            'Data Ditemukan\n' +
            'NIS: ' + data[0].data.nis + '\n' +
            'NISN: ' + data[0].data.nisn + '\n' +
            'Kelas: ' + data[0].data.detail_kelas.kelas.nama_kelas + '\n' +
            'Nama Lengkap: ' + data[0].data.biodata.nama_lengkap + '\n' +
            'Jenis Kelamin: ' + data[0].data.biodata.jenis_kelamin + '\n' +
            'Tempat, Tanggal Lahir: ' + data[0].data.biodata.tempat_lahir + ', ' + data[0].data.biodata.tanggal_lahir + '\n' +
            'Agama: ' + data[0].data.biodata.agama + '\n' +
            'Alamat: ' + data[0].data.biodata.alamat_jalan + ' RT' + data[0].data.biodata.alamat_rt + '/' + data[0].data.biodata.alamat_rw +
            ' Kel/Desa ' + data[0].data.biodata.alamat_desa + ' Kec. ' + data[0].data.biodata.alamat_kecamatan + ' ' + data[0].data.biodata.alamat_kota + ' Kodepos ' + data[0].data.biodata.alamat_pos + '\n' +
            'No Handphone: ' + data[0].data.biodata.telp_mobile + '\n' +
            'Email: ' + data[0].data.biodata.email + '\n' +
            ''
            , {parseMode})
        }
      })
      .catch(error => {
        console.log(error)
        return bot.sendMessage(id, 'Terjadi kesalahan pada server. Silakan coba lagi')
      });
  }

  // return bot.sendMessage(
  // id, `This is a <b>${ type }</b> message.`, {replyToMessage, parseMode}
  // );
});

bot.start();