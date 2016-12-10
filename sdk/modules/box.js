/*
 * name: box.js
 * version: v4.0.1
 * update: 按钮线条颜色
 * date: 2016-01-29
 */
define('box', function(require, exports, module) {
	app.ready(function() {
		var dialogBox = api.require('dialogBox');
		var def = {
			bg: '#fff',
			title: '提示',
			oktext: '确认',
			canceltext: '取消',
			bgclose: true,
			width: 300,
			delay: 2000,
			toastPosi: 'middle',
			btnbg: '#fff',
			corner: 4,
			btncolor: '#000',
			btnWidth: 130,
			btnHeight: 40,
			onshow: function() {},
			onclose: function() {}
		};

		$.box = function(msg, opt) {
			var opt = $.extend(def, opt);
			dialogBox.alert({
				texts: {
					content: msg,
				},
				styles: {
					bg: opt.bg,
					w: opt['width'],
					content: {
						color: '#000',
						size: 14
					}
				},
				tapClose: !!opt['bgclose']
			}, function(ret) {
				if (ret.eventType == 'left') {
					dialogBox.close({
						dialogName: 'alert'
					});
					typeof sure === 'function' && sure()
				}
			});
			return 'alert'
		};

		$.extend($.box, {
			alert: function(msg, sure, opt) {
				var opt = $.extend(def, opt);
				dialogBox.alert({
					texts: {
						title: opt['title'],
						content: msg,
						leftBtnTitle: opt['oktext']
					},
					styles: {
						bg: opt.bg,
						w: opt['width'],
						title: {
							marginT: 20,
							titleSize: 14,
							titleColor: '#000'
						},
						content: {
							color: '#000',
							size: 14
						},
						left: {
							marginB: 10,
							marginL: (opt.width - opt.btnWidth) / 2,
							w: opt.btnWidth,
							h: opt.btnHeight,
							corner: opt.corner,
							bg: opt.btnbg,
							color: opt.btncolor
						}
					},
					tapClose: !!opt['bgclose']
				}, function(ret) {
					if (ret.eventType == 'left') {
						dialogBox.close({
							dialogName: 'alert'
						});
						typeof sure === 'function' && sure()
					}
				});
				return 'alert'
			},
			confirm: function(msg, sure, cancel, opt) {
				var opt = $.extend(def, opt);
				dialogBox.alert({
					texts: {
						title: opt['title'],
						content: msg,
						leftBtnTitle: opt['oktext'],
						rightBtnTitle: opt['canceltext']
					},
					styles: {
						bg: opt.bg,
						w: opt['width'],
						title: {
							marginT: 20,
							titleSize: 14,
							titleColor: '#000'
						},
						content: {
							color: '#000',
							size: 14
						},
						left: {
							marginB: 10,
							marginL: 20,
							w: opt.btnWidth,
							h: opt.btnHeight,
							corner: opt.corner,
							bg: opt.btnbg,
							color: opt.btncolor
						},
						right: {
							marginB: 10,
							marginL: 10,
							w: opt.btnWidth,
							h: opt.btnHeight,
							corner: opt.corner,
							bg: opt.btnbg,
							color: opt.btncolor
						}
					},
					tapClose: !!opt['bgclose']
				}, function(ret) {
					if (ret.eventType == 'left') {
						dialogBox.close({
							dialogName: 'alert'
						});
						typeof sure === 'function' && sure()
					} else if (ret.eventType == 'right') {
						dialogBox.close({
							dialogName: 'alert'
						});
						typeof sure === 'function' && cancel()
					}
				});
				return 'confirm'
			},
			msg: function(msg, opt) {
				var opt = $.extend(def, opt);
				app.window.openToast(msg, opt['delay'], opt['position']);
				if(typeof(opt['onclose']) === 'function'){
					setTimeout(function(){
						opt['onclose']()
					},opt['delay']);
				}
				return 'msg'
			},
			amount: function(num, cb, opt) {
				var opt = $.extend(def, opt);
				dialogBox.amount({
					texts: {
						title: '选择数量',
						default: num || '1',
						leftBtnTitle: opt.oktext,
						rightBtnTitle: opt.canceltext
					},
					styles: {
						bg: opt.bg,
						corner: opt.corner,
						w: opt.width,
						h: 160,
						title: {
							marginT: 20,
							size: 14,
							color: '#000'
						},
						input: {
							w: 150,
							h: 40,
							marginT: 15,
							size: 14,
							color: '#000'
						},
						dividingLine: {
							marginT: 10,
							width: 0.5,
							color: '#696969'
						},
						left: {
							marginL: 10,
							w: opt.btnWidth,
							h: opt.btnHeight,
							bg: opt.btnbg,
							color: opt.btncolor
						},
						right: {
							marginR: 10,
							w: opt.btnWidth,
							h: opt.btnHeight,
							bg: opt.btnbg,
							color: opt.btncolor
						}
					},
					tapClose: !!opt['bgclose']
				}, function(ret) {
					if (ret.eventType == 'left') {
						dialogBox.close({
							dialogName: 'amount'
						});
						typeof cb === 'function' && cb(ret.amount)
					} else if (ret.eventType == 'right') {
						dialogBox.close({
							dialogName: 'amount'
						});
					}
				});
				return 'amount'
			},
			input: function(placeholder, cb, opt) {
				var opt = $.extend(def, opt);
				dialogBox.input({
					keyboardType: 'default',
					texts: {
						title: opt.title,
						placeholder: placeholder,
						leftBtnTitle: opt.oktext,
						rightBtnTitle: opt.canceltext
					},
					styles: {
						bg: opt.bg,
						corner: opt.corner,
						w: opt.width,
						h: 200,
						title: {
							h: 60,
							alignment: 'center',
							size: 14,
							color: '#000'
						},
						input: {
							h: 60,
							textSize: 14,
							textColor: '#000'
						},
						dividingLine: {
							width: 0.5,
							color: '#696969'
						},
						left: {
							bg: opt.btnbg,
							h: opt.btnHeight,
							color: opt.btncolor
						},
						right: {
							bg: opt.btnbg,
							h: opt.btnHeight,
							color: opt.btncolor
						}
					}
				}, function(ret) {
					if (ret.eventType == 'left') {
						dialogBox.close({
							dialogName: 'input'
						});
						typeof cb === 'function' && cb(ret.text)
					} else if (ret.eventType == 'right') {
						dialogBox.close({
							dialogName: 'input'
						});
					}
				});
				return 'input'
			},
			hide: function(name) {
				dialogBox.close({
					dialogName: name || 'alert'
				});
			}

		})
	})
});